import { NextApiRequest, NextApiResponse } from 'next';
export const authorize = async (req: NextApiRequest, res: NextApiResponse, admin=false) => {
  let authorization = null
  if(!authorization) authorization = req.headers.authorization
  if(!authorization && req.cookies.auth) {
    const auth = JSON.parse(req.cookies.auth)
    if(auth) authorization = `Bearer ${auth.access_token}`
  }
  req.headers.authorization = authorization
  
  const profileRes = await fetch('https://ion.tjhsst.edu/api/profile', {headers: {
    'Authorization': authorization
  }})
  let profileBody = await profileRes.json()
  let authorized = Boolean(profileBody.id)
  let user = null
  
  if(admin && authorized){
    user = await db.user.findFirst({
      where: {
        ionId: String(profileBody.id)
      }
    })
  
    if(!user.admin) authorized = false;
  }

  return {
    authorized,
    profileBody,
    user
  }
}