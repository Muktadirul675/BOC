import AddTopic from "@/components/admin/topics/AddTopics";
import TopicsList from "@/components/admin/topics/TopicsList";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function SubjectsPage(){
    const topics  = await prisma.topic.findMany({
        select:{
            name: true,
            subject: true,
            articles: true,
        }
    })
    const subjects = await prisma.subject.findMany()
    prisma.$disconnect()
    return(
        <div className="p-2 md:lg:xl:p-3">
            <AddTopic subjects={subjects}/>
            <TopicsList topics={topics}/>
        </div>
    )
}