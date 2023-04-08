// pages/api/update-user-email.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const { currentUser } = await serverAuth(req,res);
        await prisma.user.update({
            where: { id: currentUser.id },
            data: { email: req.body.email },
        });
        res.status(200).json({ message: "Kullanıcının email adresi güncellendi." });
    } catch (error) {

        res.status(500).json({ message: "Kullanıcının email adresi güncellenirken bir hata oluştu." });
    }
}
