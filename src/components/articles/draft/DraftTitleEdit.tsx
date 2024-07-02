'use client';

import { updateDraftTitle } from "@/app/actions";
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";

function Submit(){
    const {pending} = useFormStatus();
    return(
        <>
            {pending? <Button size="sm" isLoading colorScheme="blue">Next</Button>:<Button size="sm" type="submit" colorScheme="blue">Next</Button>}
        </>
    )
}

export default function DraftTitleEdit({id,title}:{id:string,title:string}) {
    const [res,action] = useFormState(updateDraftTitle,{type:'',message:'',id:''})
    const [input, setInput] = useState<string>(title);
    let isError = title === ''

    useEffect(()=>{
        if(res.type === 'success') redirect(`/articles/${res.id}/content`)
    },[res])

    return (
        <form action={action}>
            <FormControl isInvalid={isError} isRequired>
                <FormLabel>Type a suitable title</FormLabel>
                <input name="id" value={id} readOnly hidden/>
                <Textarea name="title" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Your title goes here..." />
                <FormHelperText>It is recommended to make your title attractive and short</FormHelperText>
                <FormErrorMessage>Title can't be empty</FormErrorMessage>
            </FormControl> <br />
            <Submit />
        </form>
    )
}