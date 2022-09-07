import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  let {authorized, profileBody, user} = await authorize(req, res, true)
  if(!authorized) return res.status(401).send(null)

  if(req.method == 'POST'){
    const tst = await db.tST.findUnique({where: {id: req.body.tstId}, include: {submissions: {select: {id: true, answers: true}}}})
    
    // compute answers: potentially weighted
    let answers = tst.submissions.map(s => s.answers)
    if(tst.weighted){
      let weights = answers.reduce((a, b) => a.map((e, i) => e + b[i]))

      weights = weights.map(w => w == 0 ? 0 : 1+Math.log(answers.length / w)) // weight: 1 + Log(submissions/solves)

      answers = answers.map(s => s.map((x, i) => x*weights[i]))
    }
    
    // compute scores: sum(answers)
    let scores = answers.map(x => x.reduce((a, b) => a+b))

    // compute top 12 average
    let top = 12
    let topAvg = [...scores].sort((a, b) => b-a).slice(0, top).reduce((a, b) => a+b)/top
    let index = scores.map(s => s*2000/topAvg) // index = 2000*score/top12avg

    // update submission documents
    for(let i = 0; i < tst.submissions.length; i++){
      await db.submission.update({
        where: {
          id: tst.submissions[i].id,
        },
        data: {
          index: index[i],
          score: scores[i]
        }
      })
    }

    res.status(200).json({
      topAvg
    })
  }

  return res.status(400).send(null)
}

export default handler;
