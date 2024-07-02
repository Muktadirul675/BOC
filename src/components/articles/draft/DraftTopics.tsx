'use client';

import { updateDraftTopics } from "@/app/actions";
import { Button, FormControl, FormHelperText, FormLabel, Input, Tag, TagCloseButton, TagLabel, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { useFormStatus, useFormState } from "react-dom";

interface Tpc {
    name: string,
    id: string,
    selected: boolean,
    subject: string
}

function Submit() {
    const { pending } = useFormStatus();
    if(pending){
        return <Button colorScheme="blue" size="sm" isLoading>Next</Button>
    }else{
        return <Button colorScheme="blue" size="sm" type="submit">Next</Button>
    }
}


export default function DraftTopics({ selectedSubjects, selectedTopics, id }: { selectedSubjects: Subject[], selectedTopics: Topic[] , id: string}) {
    const [search, setSearch] = useState<string>('')
    const [topics, setTopics] = useState<Tpc[]>([]);
    const [selecteds, setSelecteds] = useState<Tpc[]>([]);
    const [show, setShow] = useState<Tpc[]>([]);

    useEffect(() => {
        let newArr = []
        for (var i of selectedSubjects) {
            if (i.topics) {
                for (var j of i.topics) {
                    let selected = false;
                    for (var k of selectedTopics) {
                        if (j.id == k.id) { selected = true; break; }
                    }
                    let add = { id: j.id as string, name: j.name as string, selected: selected, subject: j.subject?.name as string }
                    newArr.push(add)
                }
            }
        }
        setTopics(newArr)
    }, [])

    useEffect(() => {
        if (search == '') {
            setShow(topics)
        } else {
            setShow(topics.filter((topic) => topic.name.toLowerCase().includes(search.toLowerCase())))
        }
    }, [search, topics])

    useEffect(() => {
        let newArr: Tpc[] = []
        for (var i of topics) {
            if (i.selected) {
                newArr.push(i)
            }
        }
        setSelecteds(newArr)
    }, [topics])

    const router = useRouter() 
    const [input, setInput] = useState<string>('');

    useEffect(()=>{
        let str = "";
        for(var i of selecteds){
            str += i.id +","
        }
        setInput(str);
    },[selecteds])

    const [res,action] = useFormState(updateDraftTopics, {type:'',message:'',id:''})

    useEffect(()=>{
        if(res.type == 'success') router.push(`/articles/${id}/preview`)
    },[res])

    return (
        <div>
            {/* {JSON.stringify(selectedSubjects)}
            {JSON.stringify(selectedTopics)} */}
            <form action={action}>
                <Input name="topics" value={input} hidden readOnly/>
                <Input name="id" value={id} hidden readOnly/>
                <FormControl>
                    <FormLabel>Select Topics</FormLabel>
                    <FormHelperText>
                        You can select multiple topics relevant to your article from below list. Fewer is recommended. <br />
                    </FormHelperText>
                    <div className="p-3">
                        {selecteds.map((topic) => {
                            return (
                                <Tag key={topic.id} className="m-1">
                                    <TagLabel>{topic.name} | {topic.subject} </TagLabel>
                                    <TagCloseButton onClick={()=>{
                                        setTopics(topics.map((t)=>{
                                            if(t.id == topic.id){
                                                t.selected = false;
                                            }
                                            return t;
                                        }))
                                    }} />
                                </Tag>
                            )
                        })}
                    </div>
                    <div className="p-3">
                        <Input placeholder="Type to search..." value={search} onChange={(e) => setSearch(e.target.value)} type="text" />
                        <div className="h-[250px] my-1 p-3 overflow-y-auto bg-slate-50 rounded">
                            {
                                show.map((topic) => {
                                    function handleClick(){
                                        setTopics(topics.map((t)=>{
                                            if(t.id == topic.id){
                                                t.selected = !t.selected;
                                            }
                                            return t;
                                        }))
                                    }
                                    if (topic.selected) {
                                        return (
                                            <div onClick={handleClick} key={topic.id as Key} className="cursor-pointer bg-blue-300 hover:bg-blue-500 my-1 transition-all rounded shadow-sm p-1 flex">
                                                {topic.name}
                                                <div className="ms-auto">
                                                    {topic.subject}
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        return (
                                            <div onClick={handleClick} key={topic.id as Key} className="cursor-pointer hover:bg-slate-100 p-1 my-1 transition-all rounded flex">
                                                {topic.name}
                                                <div className="ms-auto">
                                                    {topic.subject}
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </FormControl>
                <Button colorScheme="blue" onClick={()=>router.push(`/articles/${id}/subjects`)} size="sm">Previous</Button>
                <span className="mx-1"></span>
                {
                    selecteds.length > 0 ? 
                    <Submit/> :
                    <Text color='red'>You must select at least one topic to continue</Text>
                }
            </form>
        </div>
    )
}