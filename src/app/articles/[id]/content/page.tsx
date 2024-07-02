import DraftContent from "@/components/articles/draft/DraftContent";
import { useParams } from "next/navigation";
import { PrismaClient } from "@prisma/client";  

const prisma = new PrismaClient()

export default async function DraftContentPage({params}:{params:{id:string}}){
    const article = await prisma.draftArticle.findUnique({
        where:{id:params.id},
        select: {content:true, title:true}
    })
    return(
        <div className="w-full md:w-3/4 lg:xl:w-1/2 p-3 mx-auto">
            <DraftContent id={params.id as string} content={article?.content as string} title={article?.title as any}/>
        </div>
    )
}