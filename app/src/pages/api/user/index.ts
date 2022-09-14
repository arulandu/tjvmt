import { authorize } from '@/lib/api/authorize';
import { db } from '@/lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { authorized, profileBody, user } = await authorize(req, res)
  if (!authorized) return res.status(401).send(null)

  try {
    if (req.method == 'GET') {
      const where = req.query.competitor === 'true' ? {competitor: true} : {} 
      let users = await db.user.findMany({where})

      const players = (await (await fetch(`https://mee6.xyz/api/plugins/levels/leaderboard/${process.env.DISCORD_GUILD_ID}`, {method: "GET"})).json()).players
      const playerMap = {}; players.forEach(p => playerMap[p.id] = p)

      users.forEach((u) => {
        u['stats'] = u.discordId ? playerMap[u.discordId] : {}
      })

      users = users.sort((a,b) => b.solvedProblemIds.length - a.solvedProblemIds.length)

      return res.status(200).json({
        users
      })
    } else if (req.method == 'POST') {
      const profilePicUrl = profileBody.picture
      const picRes = await fetch(profilePicUrl, { headers: { 'Authorization': req.headers.authorization } })
      //@ts-ignore
      const buffer = await picRes.arrayBuffer()
      const picData = `data:${picRes.headers.get('content-type')};base64,${Buffer.from(buffer).toString("base64")}`
      
      const user = await db.user.create({
        data: {
          ionId: String(profileBody.id),
          name: profileBody.full_name,
          nickname: profileBody.nickname ? profileBody.nickname : profileBody.first_name,
          ionUsername: profileBody.ion_username,
          schoolEmail: profileBody.tj_email,
          email: req.body.email,
          profilePicUrl: profilePicUrl,
          profilePicData: picData
        }
      })

      return res.status(200).json({
        user: user
      })
    } else if(req.method == 'PATCH'){
      const u = await db.user.update({where: {id: user.id}, data: {discordTag: req.body.discordTag, discordId: req.body.discordId}})
      return res.status(200).json({
        user: u
      })
    } else if(req.method == 'DELETE'){
      const user = await db.user.update({where: {id: req.query.id as string}, data: {
        authoredProblems: {
          deleteMany: {}
        },
        solvedProblems: {
          deleteMany: {}
        },
        submissions: {
          deleteMany: {}
        },
        applications: {
          deleteMany: {}
        },
        polls: {
          deleteMany: {}
        },
        pollResponses: {
          deleteMany: {}
        }
      }})
      await db.user.delete({where: {id: user.id}})
      return res.status(200).json({user})
    }

    return res.status(400).send(null)
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: e
    })
  }
}

export default handler;
