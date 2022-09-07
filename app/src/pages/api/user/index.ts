import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => { 
  const {authorized, profileBody} = await authorize(req, res)
  if(!authorized) return res.status(401).send(null)
  
  if(req.method == 'POST'){
    try {
      const user = await db.user.create({
        data: {
          ionId: String(profileBody.id),
          name: profileBody.full_name,
          nickname: profileBody.nickname ? profileBody.nickname : profileBody.first_name,
          ionUsername: profileBody.ion_username,
          schoolEmail: profileBody.tj_email,
          email: req.body.email,
          profilePic: profileBody.picture
        }
      })

      return res.status(200).json({
        user: user
      })
    } catch (e) {
      return res.status(400).json({
        error: 'user already exists',
        message: e
      })
    }
  }

  return res.status(400).send(null)
}

export default handler;
