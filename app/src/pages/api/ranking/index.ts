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

      let rank = 1; let starts = []; starts.push(0)
      let userInd = -1
      for(let i = 0; i < apps.length; i++){
        if(i > 0 && apps[i].index != apps[i-1].index) {rank += i-starts[starts.length-1]; starts.push(i);}
        ranks[i]['rank'] = rank
        ranks[i]['index'] = apps[i].index
        if(apps[i].authorId === user.id){
          userInd = i;
        }
      }
      
      const cutoff = apps[Math.min(apps.length,selection.size)-1].index
      for(let i = 0; i < apps.length; i++){
        ranks[i]['name'] = (i < selection.size || i == userInd) ? apps[i].author.ionUsername : '???';
        if(i >= selection.size && Math.abs(userInd-i) > 1){
          ranks[i]['index'] = -1;
        }
        if(i > 0 && (ranks[i-1] == null || ranks[i-1]['index'] == -1) && ranks[i]['index'] == -1) ranks[i] = null
      }
      const rankings = ranks.filter((r) => r)
      // const rankings = ranks
      return res.status(200).json({ cutoff, userInd, submissions, rankings})
    }
  } catch (e) {
    return res.status(400).json({
      message: e.message
    })
  }

  return res.status(400).send(null)
}

export default handler;
