import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == 'GET') {
      const { authorized, user } = await authorize(req, res, false)
      if (!authorized) return res.status(401).send(null)
      
      const selectionId = req.query.selectionId as string
      const selection = await db.selection.findFirst({where: {id: selectionId}})
      if(!selection) throw Error("selection not found")

      const apps = await db.application.findMany({where: {selectionId}, include: {author: { select: { ionUsername: true }}}, orderBy: {index: 'desc'}})
      const ranks = apps.map(app => ({}))
      const submissions = await db.submission.findMany({where: {authorId: user.id}, include: {tst: {select: {name: true, solves: true}}}})
      submissions.forEach(s => s.tst.solves = s.tst.solves.map((e,i) => s.answers[i] > 0 ? e : -1))

      let rank = 1; let starts = [0]
      let userInd = -1
      for(let i = 0; i < apps.length; i++){
        if(i > 0 && apps[i].index != apps[i-1].index) {starts.push(i); rank++;}
        ranks[i]['rank'] = rank
        ranks[i]['index'] = apps[i].index
        if(apps[i].authorId === user.id){
          userInd = i;
        }
      }

      for(let i = 0; i < apps.length; i++){
        ranks[i]['name'] = i < 10 || Math.abs(ranks[i]['rank']-ranks[userInd]['rank']) <= 1? apps[i].author.ionUsername : "???"
      }
      
      const cutoff = apps[Math.min(apps.length,selection.size)-1].index
      return res.status(200).json({ cutoff, userInd, submissions, rankings: ranks})
    }
  } catch (e) {
    return res.status(400).json({
      message: e.message
    })
  }

  return res.status(400).send(null)
}

export default handler;
