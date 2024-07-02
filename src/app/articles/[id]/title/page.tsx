import DraftContent from "@/components/articles/draft/DraftContent";
import DraftTitleEdit from "@/components/articles/draft/DraftTitleEdit";
import { PrismaClient } from "@prisma/client";  

const prisma = new PrismaClient()

export default async function DraftTitleEditPage({params}:{params:{id:string}}){
    const article = await prisma.draftArticle.findUnique({
        where:{id:params.id},
        select: {title:true}
    })
    return(
        <div className="w-full md:w-3/4 lg:xl:w-1/2 p-3 mx-auto">
            <DraftTitleEdit title={article?.title as string} id={params.id}/>
        </div>
    )
}