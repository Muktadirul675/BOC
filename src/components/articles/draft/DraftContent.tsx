'use client';

import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Textarea, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { truncate } from '@/utils/words';
import { useFormState, useFormStatus } from "react-dom";
import { updateDraft } from "@/app/actions";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

function Submit() {
    const { pending } = useFormStatus();
    if(pending){
        return <Button colorScheme="blue" size="sm" isLoading>Next</Button>
    }else{
        return <Button colorScheme="blue" size="sm" type="submit">Next</Button>
    }
}

export default function DraftContent({ content, title, id }: { content: string, title: string, id:string }) {
    const [input, setInput] = useState<string>(content ? content : '');
    let isError = input === ''
    const [res, action] = useFormState(updateDraft, { type: '', message: '' });
    const router = useRouter()

    useEffect(()=>{
        if(res.type == 'success'){
            router.push(`/articles/${id}/subjects`)
        }
    },[res])

    return (
        <>
            {/* <h3 className="text-gray-300">
                {truncate(title, 50)}
            </h3> */}
            <form action={action}>
                <FormControl isInvalid={isError} isRequired>
                    <FormLabel>Article</FormLabel>
                    <input name='id' value={id} hidden readOnly/>
                    <Textarea name='content' value={input} onChange={(e) => setInput(e.target.value)} />
                    <FormErrorMessage>Article can't be empty</FormErrorMessage>
                </FormControl>
                <br />
                <Button colorScheme="blue" onClick={()=>router.push(`/articles/${id}/title`)} size="sm">Previous</Button>
                <span className="mx-1"></span>
                <Submit/>
            </form>
        </>
    )
}