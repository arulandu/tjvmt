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
    
    let subjTsts = ["6531582f50974206aa817aa0", "65348523fd708a86f6224b66", "65399607914b8a550b0fc28a", "653996c2b5d493a82e95163c"];

    const indexes = users.map(user => {
      let subs = user.submissions.filter(s => selection.weights[tstId2Name[s.tstId]]).sort((a, b) => b.index-a.index)
      if (req.body.selectionId == '65aa8dd94041e83ab8038c90'){
        // HMMT 24 Protocol: Remove least subject TST
         const subjTstSubmissions = subs.filter(sub => subjTsts.includes(sub.tstId));
         if (subjTstSubmissions.length > 0) {
            const minIndexSub = subjTstSubmissions.reduce((minSub, currentSub) => currentSub.index < minSub.index ? currentSub : minSub);
            subs = subs.filter(sub => sub !== minIndexSub);
         } 
      }
      // console.log(user, subs);
      if(subs.length === 0) return 0;
      let subNames = subs.map(s => tstId2Name[s.tstId])

      const entries = Object.entries(selection.weights).filter(s => {
        const is0 = subNames.indexOf(s[0])
        return is0 === -1 || subs.length-is0 > selection.drops
      })

      const weightSum = entries.map(s => s[1]).reduce((a, b) => a + b)
      // console.log(weightSum);
      const normWeights = Object.fromEntries(entries.map(s => [s[0], s[1]/1]))
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
