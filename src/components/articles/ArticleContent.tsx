import { Avatar, Tag } from "@chakra-ui/react";
import ArticleContentBody from "./ArticleContentBody";
import Image from 'next/image';
import { Key } from "react";
import ArticleBookmark from "./ArticleBookmark";

export default function ArticleContent({ article }: { article: Article }) {
    return (
        <div className="relative article p-3">
            <div className="header flex items-center">
                <Avatar size="sm" src={article.author.image} name={article.author.name} />
                <div className="author ms-2">
                    <h3>{article.author.name}</h3>
                </div>
                <h6 className="ms-auto text-gray-500">{article.createdAt.toDateString()}</h6>
            </div>
            <div className="body flex my-2">
                <h3 className="text-lg w-3/4">{article.title}</h3>
                <div className="relative w-1/4">
                    <Image width={100} height={100} src={`/uploads/articles/thumbnails/${article.coverImage}`} alt="img" className="w-full"/>
                </div>
            </div>
            <div className="footer flex">
                <div className="flex flex-wrap w-4/6">
                    {article.tags.map((tag:Tag)=><Tag className="me-2" key={tag.name as Key}>{tag.name}</Tag>)}
                </div>
                <div className="w-2/6 flex justify-end items-center">
                    <ArticleBookmark/>
                </div>
            </div>
        </div>
    )
}