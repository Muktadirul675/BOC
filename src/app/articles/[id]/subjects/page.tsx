import DraftSubjects from "@/components/articles/draft/DraftSubjects"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function SubjectsPage({params}:{params:{id:string}}){
    const allSubjects = await prisma.subject.findMany()
    const selectedSubjects = await prisma.draftArticle.findUnique({
        where:{id:params.id},
        select: {subjects:true}
    }) 
    return(
        <div className="w-full md:w-3/4 lg:xl:w-1/2 p-3 mx-auto">
            <DraftSubjects id={params.id as string} allSubjects={allSubjects} selectedsubjects={selectedSubjects?.subjects}/>
        </div>
    )
}