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
    
    let subjTsts = ["6719b8835b8dce1d28ba919f", "67045adab3516003ead1b095", "6719ae7d69ff42069ba5bb3b", "6719b922f1dec559b732c4ac"]; // for hmmt/pumac 2024-25
    let dukeTsts = ["66edc62837cb8a2b31a88b0e", "66ee2fd7c2e99d23291f293f", "66f18a43453b99e07318f6cb", "66f18a5d9685467b58f161a9"]; // for duke 2024
    
    let dukeSelectionId = '66f19e01190b2a6b9aac7c5a' // for duke 2024
    let pumacSelectionId = '671adf3a637f154b6c7029e0' // for pumac 2024
    let hmmtSelectionId = '6792bc1ba464cd2d35d19cc7' // for hmmt 2025

    const indexes = users.map(user => {
      let subs = user.submissions.filter(s => selection.weights[tstId2Name[s.tstId]]).sort((a, b) => b.index-a.index)

      let subNames = subs.map(s => tstId2Name[s.tstId])

      const entries = Object.entries(selection.weights).filter(s => {
        const is0 = subNames.indexOf(s[0])
        return is0 === -1 || subs.length-is0 > selection.drops
      })

      // const weightSum = entries.map(s => s[1]).reduce((a, b) => a + b)
      // console.log(weightSum);
      const normWeights = Object.fromEntries(entries.map(s => [s[0], s[1]/1]))

      if (req.body.selectionId == hmmtSelectionId){
        // HMMT 25 Protocol: 15 15 15 0
         const subjTstSubmissions = subs.filter(sub => subjTsts.includes(sub.tstId));
         if (subjTstSubmissions.length == 4) {
            const minIndexSub = subjTstSubmissions.reduce((minSub, currentSub) => currentSub.index < minSub.index ? currentSub : minSub);
            normWeights[tstId2Name[minIndexSub.tstId]] = 0;
         } 
      }
      else if (req.body.selectionId == pumacSelectionId){
        // pumac 24 Protocol: 30 30 10 0
         const subjTstSubmissions = subs.filter(sub => subjTsts.includes(sub.tstId));
         if (subjTstSubmissions.length == 4) {
            const minIndexSub = subjTstSubmissions.reduce((minSub, currentSub) => currentSub.index < minSub.index ? currentSub : minSub);
            const secIndexSub = subjTstSubmissions.reduce((secSub, currentSub) => currentSub.tstId != minIndexSub.tstId && currentSub.index < secSub.index ? currentSub : secSub);
            normWeights[tstId2Name[minIndexSub.tstId]] = 0;
            normWeights[tstId2Name[secIndexSub.tstId]] = 0.1;
         } 
      }
      else if (req.body.selectionId == dukeSelectionId){
        // Duke 24 Protocol: 35 35 20 0
        const dukeTstSubmissions = subs.filter(sub => dukeTsts.includes(sub.tstId));
        if (dukeTstSubmissions.length == 4) {
            const minIndexSub = dukeTstSubmissions.reduce((minSub, currentSub) => currentSub.index < minSub.index ? currentSub : minSub);
            const secIndexSub = dukeTstSubmissions.reduce((secSub, currentSub) => currentSub.tstId != minIndexSub.tstId && currentSub.index < secSub.index ? currentSub : secSub);
            normWeights[tstId2Name[minIndexSub.tstId]] = 0;
            normWeights[tstId2Name[secIndexSub.tstId]] = 0.2;
         } 
      }
      // console.log(normWeights);
      // console.log(user, subs);
      if(subs.length === 0) return 0;

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
