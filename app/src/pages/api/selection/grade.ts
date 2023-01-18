import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { Timer } from '@/lib/timer';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  const {authorized, user} = await authorize(req, res, true)
  if(!authorized) return res.status(401).send(null)

  if(req.method == 'POST'){
    // create an application for all competitors
    // compute index for each application
    const selection = await db.selection.findUnique({where: {id: req.body.selectionId as string}});

    const users = await db.user.findMany({include: {submissions: {select: {tstId: true, index: true}}}});
    const tsts = await db.tST.findMany({});
    const tstId2Name = Object.fromEntries(tsts.map(t => [t.id, t.name]))
    
    const indexes = users.map(user => {
      let subs = user.submissions.filter(s => selection.weights[tstId2Name[s.tstId]]).sort((a, b) => b.index-a.index)
      if(subs.length === 0) return 0;
      let subNames = subs.map(s => tstId2Name[s.tstId])

      const entries = Object.entries(selection.weights).filter(s => {
        const is0 = subNames.indexOf(s[0])
        return is0 === -1 || subs.length-is0 > selection.drops
      })

      const weightSum = entries.map(s => s[1]).reduce((a, b) => a + b)
      const normWeights = Object.fromEntries(entries.map(s => [s[0], s[1]/weightSum]))
      const inds = [0].concat(subs.slice(0, subs.length-selection.drops).map(s => normWeights[tstId2Name[s.tstId]] * s.index))
      const ind = inds.reduce((a, b) => a+b)

      return ind
    })

    await Promise.all(users.map(async (user, i) => {
      let application = await db.application.findFirst({where: {authorId: user.id, selectionId: selection.id}});
      const doc = {
        authorId: user.id,
        selectionId: selection.id,
        index: indexes[i]
      }

      if(application){
        application = await db.application.update({where: {id: application.id}, data: doc})
      } else {
        application = await db.application.create({data: doc})
      }
    }))

    return res.status(200).json({});
  }


  return res.status(400).send(null)
}

export default handler;
