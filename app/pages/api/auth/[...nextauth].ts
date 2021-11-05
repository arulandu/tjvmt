import { User, UserModel } from 'lib/api/db/models/User'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { dbConnect } from 'lib/api/db/database'
import { OAuthConfig } from 'next-auth/providers'

const options = {
    providers: [
        {
            id: "ion",
            name: "Ion",
            type: "oauth",
            version: "2.0",
            scope: 'read',
            params: { grant_type: "authorization_code" },
            authorizationUrl: "https://ion.tjhsst.edu/oauth/authorize?response_type=code",
            accessTokenUrl: "https://ion.tjhsst.edu/oauth/token",
            profileUrl: "https://ion.tjhsst.edu/api/profile",
            async profile(profile, tokens) {
                // console.log('profile calc')
                await dbConnect()
                let curUser = await UserModel.findOne({ ionUsername: profile.ion_username as string })
                if (!curUser) {
                    // create new user
                    curUser = await UserModel.create({
                        firstName: profile.first_name,
                        lastName: profile.last_name,
                        ionUsername: profile.ion_username,
                        gradYear: profile.graduation_year,
                        email: profile.tj_email,
                        onEmailList: false,
                        isOffier: false,
                    })
                }

                // for user returned in the profile method ik its weird
                // email, image, name are required fields
                return {
                    id: curUser._id,
                    email: 'email',
                    image: 'image',
                    name: 'name'
                }
            },
            clientId: process.env.ION_CLIENT_ID!,
            clientSecret: process.env.ION_CLIENT_SECRET!
        } as OAuthConfig
    ],
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60 // 24 hrs
    },
    // jwt: {},
    // pages: {},
    callbacks: {
        // called when the session is accessed
        // token: default token structure {name, email, picture, sub} (token is STORED in COOKIE)
        // user: object returned by profile() ^^
        // account: token information
        // profile: profile returned by profile url
        jwt: async (token: any, user: any, account: any, profile: any, isNewUser: boolean) => {
            // console.log('jwt callback')
            if (!user) return token // user will be undefined when session is accessed - next-auth sketchy lol
            token.userId = user.id
            return token
        },
        // called when session is accessed
        session: async (session: any, user: any) => {
            // console.log('session callback')

            await dbConnect()
            session.user = await UserModel.findOne({ _id: user.userId })
            
            return session
        }
    },
    secret: process.env.COOKIE_KEY,
    events: {},
    debug: false
}

export default (req: any, res: any) => NextAuth(req, res, options)