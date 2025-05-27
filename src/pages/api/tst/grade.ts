import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  let {authorized, profileBody, user} = await authorize(req, res, true)
  if(!authorized) return res.status(401).send(null)

  if(req.method == 'POST'){
    const tst = await db.tST.findUnique({where: {id: req.body.tstId}, include: {submissions: {select: {id: true, answers: true, writer: true}}}})
    
    // compute answers: potentially weighted
    let subs = tst.submissions.filter(s => !s.writer)
    let answers = subs.map(s => s.answers)
    if(answers.length == 0) return res.status(200).json({})

    let solves = answers.reduce((a, b) => a.map((e, i) => e + b[i]))

    if(tst.weighted){
      let weights = solves.map(s => s == 0 ? 0 : 1+Math.log(answers.length / s)) // weight: 1 + Log(submissions/solves)
      answers = answers.map(s => s.map((x, i) => x*weights[i]))
    }
    
    // compute scores: sum(answers)
    let scores = answers.map(x => x.reduce((a, b) => a+b))

    // compute top 12 average
    let top = 12
    let topAvg = [...scores].sort((a, b) => b-a).slice(0, top).reduce((a, b) => a+b)/top
    let index = scores.map(s => s*2000/topAvg) // index = 2000*score/top12avg

    await db.tST.update({where: {id: tst.id}, data: { solves }})
    
    // update submission documents
    await Promise.all(subs.map(async (s, i) => {
      await db.submission.update({
        where: {
          id: s.id,
        },
        data: {
          index: index[i],
          score: scores[i]
        }
      })
    }))
    
    // await Promise.all(tst.submissions.filter(s => s.writer).map(async (s) => 
    //   await db.submission.update({where: {id: s.id}, data: {index: 2000}})
    // ))

    res.status(200).json({
      topAvg
    })
  }

  return res.status(400).send(null)
}

export default handler;
