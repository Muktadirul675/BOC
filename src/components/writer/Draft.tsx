'use client';

import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Draft({draft}:{draft:DraftArticle}){
    const router = useRouter()
    return(
        <div className="p-3 flex flex-wrap w-full">
            <h3 className="text-lg w-4/6">{draft.title}</h3>
            <div className="ms-auto w-2/6">
                <form>
                    <input type="submit" value="" hidden />
                    <Button onClick={()=>router.push(`/articles/${draft.id}/title`)} size="sm" colorScheme="blue">Edit</Button>
                    <span className="mx-1"></span>
                    <Button size="sm" colorScheme="blue">Publish</Button>
                </form>
            </div>
        </div>
    )
}
