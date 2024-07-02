import { auth } from "@/auth"
import { User } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import Draft from "@/components/writer/Draft";

const prisma = new PrismaClient()

export default async function WriterPage() {
    const session = await auth()
    const user: User | undefined = session?.user;

    const articles = await prisma.article.findMany({
        where: { authorEmail: user?.email as string }
    })

    const drafts = await prisma.draftArticle.findMany({
        where: { authorEmail: user?.email as string }
    })

    return (
        <div>
            Writer
        </div>
    )
}