import Period from "@/components/Period"
import PreviewInfo from "@/components/preview/PreviewInfo"
import { Avatar, Button, Tag, TagLabel, Text } from "@chakra-ui/react"
import { PrismaClient } from "@prisma/client"
import Link from "next/link"
// import { useRouter } from "next/navigation"
import { Key } from "react"

const prisma = new PrismaClient()

export default async function ArticlePreviewPage({params}:{params:{id:string}}){
    const article = await prisma.draftArticle.findUnique({
        where: {id: params.id},
        include:{
            subjects:true,
            tags: true,
            author: true
        }
    })
    // const router = useRouter()
    return(
        <div className="w-full lg:xl:w-1/2 mx-auto p-5">
            <PreviewInfo id={params.id}/>
            <Text fontSize="3xl">
                {article?.title}
            </Text>
            <div className="subjects">
                {article?.subjects.map((sub)=>{
                    return(
                        <span key={sub.id as Key} className="m-1 rounded-full px-3 py-1 bg-blue-500 w-fit text-white text-sm">
                            {sub.name}
                        </span>
                    )
                })}
            </div>
            <div className="my-3 flex items-center text-sm">
                <Avatar src={article?.author.image as string} size="sm" name={article?.author.name as string}/>
                <span className="mx-1"></span>
                {article?.author.name as string}
                <div className="mx-1">
                    <Period/>
                </div>
                <Text fontSize={'sm'}>{article?.createdAt.toDateString()}</Text>
            </div>
            <div className="my-5">
                <Text>
                    {article?.content}
                </Text>
            </div>
            <div className="topics">
                {article?.tags.map((topic)=>{
                    return(
                        <Tag key={topic.id as Key} className="m-1">
                            <TagLabel>{topic.name}</TagLabel>
                        </Tag>
                    )
                })}
            </div>
        </div>
    )
}