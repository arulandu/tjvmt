import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 

  if(req.method == 'POST'){
    const {authorized, profileBody} = await authorize(req, res)
    if(!authorized) return res.status(401).send(null)
    
    try {
      const updateUser = await db.user.update({
        where: {
          ionId: String(profileBody.id)
        },
        data: {
          attendance: true
        },
      })

      return res.status(200).json({
        updateUser: updateUser
      })

    } catch (e) {
      return res.status(400).json({
        error: 'uh-oh',
        message: e
      })
    }
  }

  if(req.method == 'PUT') {
    try {
      const updateUser = await db.user.updateMany({
        data: {
          attendance: false
        },
      })

    } catch (e) {
      return res.status(400).json({
        error: 'uh-oh',
        message: e
      })
    }
  }

  return res.status(400).send(null)
}

export default handler;
