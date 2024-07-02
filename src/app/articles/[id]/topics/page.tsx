import DraftTopics from "@/components/articles/draft/DraftTopics";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function DraftTopicsPage({params}:{params:{id:string}}){
    const subjects = await prisma.draftArticle.findUnique({
        where:{id:params.id},
        select:{
            subjects:{
                include:{
                    topics: {
                        include: {subject: true}
                    }
                }
            },
            tags:{
                include:{subject:true}
            }
        }
    })
    return(
        <div className="w-full md:w-3/4 lg:xl:w-1/2 p-3 mx-auto">
            {/* {JSON.stringify(subjects)} */}
            {subjects ? <DraftTopics id={params.id as string} selectedSubjects={subjects.subjects} selectedTopics={subjects?.tags}/>  : <p>No subjects</p> }
        </div>
    )
}