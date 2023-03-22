import bcrypt from 'bcrypt';
import {NextApiRequest, NextApiResponse} from 'next';
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }
    try {
        const {email, name, password} = req.body;
        const existingUser = await prismadb.user.findFirst({
            where: {
                email,
            }
        })
        if (existingUser) {
            return res.status(422).json({message: 'Email taken before!'})
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prismadb.user.create({
                data: {
                    email,
                    name,
                    hashedPassword,
                    image: "",
                    emailVerified: new Date(),

                }
            }
        )
        return res.status(200).json(user)
    } catch (error:any) {
        res.status(500).json({error: error.message})
    }
}