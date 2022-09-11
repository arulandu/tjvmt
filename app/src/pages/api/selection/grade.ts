import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
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
    
    const indexes = users.map(user => [0].concat(user.submissions.map(s => selection.weights[tstId2Name[s.tstId]] * s.index)).reduce((a, b) => a+b))

    for(let i = 0; i < users.length; i++){
      let application = await db.application.findFirst({where: {authorId: users[i].id, selectionId: selection.id}});
      const doc = {
        authorId: users[i].id,
        selectionId: selection.id,
        index: indexes[i]
      }

      if(application){
        application = await db.application.update({where: {id: application.id}, data: doc})
      } else {
        application = await db.application.create({data: doc})
      }
    }

    return res.status(200).json({});
  }


  return res.status(400).send(null)
}

export default handler;
