'use client';

import { addTopic as addTopicAdtion } from "@/app/actions";
import { Button, FormControl, Input, InputGroup, Select } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, Key, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";


function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <div>
            {pending ? <Button isLoading colorScheme="blue">Add</Button> : <Button type="submit" colorScheme="blue">Add</Button>}
        </div>
    )
}

export default function AddTopic({subjects}:{subjects: Subject[]}) {
    
    const [subjectId, setSubjectId] = useState<string | undefined>(subjects[0].id)
    const addTopic = addTopicAdtion.bind(null, subjectId);
    const [state, action] = useFormState(addTopic, { type: '', message: '' })

    function handleChange(event: ChangeEvent<HTMLSelectElement>){
        setSubjectId(event.target.value)
    }

    return (
        <form action={action} className="w-full md:w-3/4 lg:xl:w-2/6 mx-auto rounded border p-3">
            <FormControl>
                <div className="flex">
                    <Input name="topic_name" className="me-2" placeholder="Add Topic" />
                    <Select onChange={handleChange}>
                        {subjects.map((subject)=>{
                            return(
                                <option key={subject.id as Key} value={subject.id}>{subject.name}</option>
                            )
                        })}
                    </Select>
                    <SubmitButton/>
                </div>
            </FormControl>
        </form>
    )
}
