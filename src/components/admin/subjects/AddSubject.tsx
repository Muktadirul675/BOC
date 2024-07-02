'use client';

import { addSubject } from "@/app/actions";
import { Button, FormControl, Input, InputGroup } from "@chakra-ui/react";
import { useFormState, useFormStatus } from "react-dom";


function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <div>
            {pending ? <Button isLoading colorScheme="blue">Add</Button> : <Button type="submit" colorScheme="blue">Add</Button>}
        </div>
    )
}

export default function AddSubject() {
    const [state, action] = useFormState(addSubject, { type: '', message: '' })
    return (
        <form action={action} className="w-full md:w-3/4 lg:xl:w-2/6 mx-auto rounded border p-3">
            <FormControl>
                <div className="flex">
                    <Input name="subject_name" className="me-2" placeholder="Add Subject" />
                    <SubmitButton/>
                </div>
            </FormControl>
        </form>
    )
}
