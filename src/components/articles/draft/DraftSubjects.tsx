'use client';

import { updateDraftSubjects } from "@/app/actions";
import { Badge, Button, FormControl, FormHelperText, FormLabel, Input, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface Sub {
    name: String,
    id: String,
    selected: boolean
}


function Submit() {
    const { pending } = useFormStatus();
    if (pending) {
        return <Button colorScheme="blue" size="sm" isLoading>Next</Button>
    } else {
        return <Button colorScheme="blue" size="sm" type="submit">Next</Button>
    }
}

export default function DraftSubjects({ allSubjects, selectedsubjects, id }: { allSubjects: Subject[], selectedsubjects: Subject[] | null | undefined, id: string }) {
    const [subjects, setSubjects] = useState<Sub[]>([]);
    const [selecteds, setSelecteds] = useState<Sub[]>([]);
    const [input, setInput] = useState<string>('');
    const router = useRouter()
    useEffect(() => {
        let newArr = [];
        for (var i of allSubjects) {
            let selected = false;
            if (selectedsubjects) {
                for (var j of selectedsubjects) {
                    if (i.id == j.id) {
                        selected = true;
                        break;
                    }
                }
            };
            let add = { id: i.id as string, name: i.name, selected: selected }
            newArr.push(add);
        }
        setSubjects(newArr)
    }, [])
    useEffect(() => {
        let selSubs = []
        for (var i of subjects) {
            if (i.selected) {
                selSubs.push(i);
            }
        }
        setSelecteds(selSubs);
    }, [subjects])
    useEffect(() => {
        let selSubsStr = "";
        for (var i of selecteds) {
            selSubsStr += i.id + ",";
        }
        setInput(selSubsStr);
    }, [selecteds])

    const [res, action] = useFormState(updateDraftSubjects, { type: '', message: '', id: '' })

    useEffect(() => {
        if (res.type == 'success') router.push(`/articles/${id}/topics`);
    }, [res])
    return (
        <form action={action}>
            {/* {JSON.stringify(allSubjects)}
            {JSON.stringify(selectedsubjects)} */}
            <FormControl isRequired>
                <FormLabel>Select Subject</FormLabel>
                <FormHelperText>
                    Choose subject from below. <br />
                    Subject(s) should be most relevant to your article. You can choose multiple subjects but one is recommended.
                </FormHelperText>
                <div className="p-3 w-5/6 m-1">
                    <div className="p-3">
                        {selecteds.map((sub) => {
                            return (
                                <Tag key={sub.id as Key} className="mx-1">
                                    <TagLabel>{sub.name}</TagLabel>
                                    <TagCloseButton onClick={() => {
                                        setSubjects(subjects.map((s) => {
                                            if (s.id == sub.id) {
                                                s.selected = false;
                                            }
                                            return s;
                                        }))
                                    }} />
                                </Tag>
                            )
                        })}
                    </div>
                    <Input type="text" name="id" value={id} hidden readOnly />
                    <Input type="text" name="subjects" value={input} onChange={(e) => setInput(e.target.value)} hidden />
                    <div className="p-3 h-[250px] overflow-y-auto rounded bg-slate-50">
                        {subjects.map((sub) => {
                            function handleClick() {
                                setSubjects(subjects.map((s) => {
                                    if (s.id == sub.id) {
                                        s.selected = !s.selected;
                                    }
                                    return s;
                                }))
                            }
                            if (sub.selected) {
                                return (
                                    <div onClick={handleClick} key={sub.id as Key} className="cursor-pointer bg-blue-300 hover:bg-blue-500 my-1 transition-all rounded shadow-sm p-1">
                                        {sub.name}
                                    </div>
                                )
                            } else {
                                return (
                                    <div onClick={handleClick} key={sub.id as Key} className="cursor-pointer hover:bg-slate-100 p-1 my-1 transition-all rounded">
                                        {sub.name}
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </FormControl>
            <Button size="sm" colorScheme="blue" onClick={() => router.push(`/articles/${id}/content`)}>Previous</Button>
            <span className="mx-1"></span>
            {
                selecteds.length > 0 ?
                    <Submit /> :
                    <Text color='red'>You must select at least one subject to continue</Text>
            }
        </form>
    )
}