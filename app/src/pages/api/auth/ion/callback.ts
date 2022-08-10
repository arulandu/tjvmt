import { setCookie } from '@/lib/api/setCookie';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query
  const state = JSON.parse(req.query.state as string)

  // get access token
  const tokenRes = await fetch('https://ion.tjhsst.edu/oauth/token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      'grant_type': 'authorization_code',
      'code': code as string,
      'client_id': process.env.ION_CLIENT_ID,
      'client_secret': process.env.ION_CLIENT_SECRET,
      'redirect_uri': `${process.env.BASE_URL}/api/auth/ion/callback`
    })
  })
  const tokenBody = await tokenRes.json()

  setCookie(res, 'auth', tokenBody, {
    secure: true,
    httpOnly: false,
    sameSite: 'none',
    path: '/',
  })

  // get profile
  const profileRes = await fetch('https://ion.tjhsst.edu/api/profile', {
    headers: {
      'Authorization': `Bearer ${tokenBody.access_token}`
    }
  })
  const profileBody = await profileRes.json()
  
  let user = await db.user.findFirst({
    where: {
      ionId: String(profileBody.id)
    }
  })

  if(user){
    res.redirect(302, process.env.BASE_URL + state.origin)
  } else {
    res.redirect(302, process.env.BASE_URL + '/signup')
  }
}

export default handler;