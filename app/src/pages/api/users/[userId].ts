import base from '@/lib/api/nc';
import { User, UserModel } from '@/lib/api/db/models/User'
import { dbConnect } from '@/lib/api/db/database';

const handler = base()
handler.get(async (req, res) => {
    const { userId } = req.query
    await dbConnect()
    let curUser = await UserModel.findOne({ _id: userId })

    res.status(200).json({
        user: curUser
    })
})

export default handler