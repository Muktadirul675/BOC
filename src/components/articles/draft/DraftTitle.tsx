'use client';

import { addDraft } from "@/app/actions";
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Select, Textarea, Input } from "@chakra-ui/react"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Key, useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom";

function Submit(){
    const {pending} = useFormStatus();
    return(
        <>
            {pending? <Button size="sm" isLoading colorScheme="blue">Next</Button>:<Button size="sm" type="submit" colorScheme="blue">Next</Button>}
        </>
    )
}

export default function DraftTitle({subjects}:{subjects: Subject[]}) {
    const [title, setTitle] = useState<string>('')
    const [isError, setIsError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false)

    const [res, action] = useFormState(addDraft, {type:'',message:'',id: ''});

    useEffect(()=>{
        if(title === '') setIsError(true);
        else setIsError(false);
    }, [title])

    useEffect(()=>{
        if(res.type === 'success'){
            if(!success){
                setSuccess(true);
                redirect(`/articles/${res.id}/content`)
            }
        }
    },[res])

    return (
        <form action={action}>
            <FormControl isInvalid={isError} isRequired>
                <FormLabel>Type a suitable title</FormLabel>
                <Textarea name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your title goes here..." />
                <FormHelperText>It is recommended to make your title attractive and short</FormHelperText>
                <FormErrorMessage>Title can't be empty</FormErrorMessage>
            </FormControl> <br/>
            <Submit/>
        </form>
    )
}