'use client';

import { Button, Icon } from "@chakra-ui/react";
import { Key } from "react";
import { useFormStatus } from "react-dom";
import { BsTrash } from "react-icons/bs";

function DelButton() {
    const { pending } = useFormStatus()
    if (pending) {
        return (
            <Button isLoading colorScheme="red">
                <Icon as={BsTrash} />
            </Button>
        )
    }
    return (
        <Button type="submit" color="red" variant={'ghost'}>
            <Icon as={BsTrash} />
        </Button>
    )
}

function Subject({ subject }: { subject: Subject }) {
    return (
        <div key={subject.id as Key} className="flex p-2 items-center hover:bg-slate-50">
            <div className="w-2/6">{subject.name}</div>
            <div className="w-2/6 text-right">{subject.topics?.length}</div>
            <div className="w-1/6 text-right">{subject.articles?.length}</div>
            <div className="w-1/6 text-right">
                <form>
                    <DelButton />
                </form>
            </div>
        </div>
    )
}

export default function SubjectsList({ subjects }: { subjects: Subject[] }) {
    return (
        <div className="w-full md:w-3/4 lg:xl:w-2/6 mx-auto my-1 rounded shadow">
            <div className="p-3 rounded-t bg-slate-200">
                <h3 className="font-bold text-md">
                    Subjects
                </h3>
            </div>
            <div className="p-2 md:lg:xl:p-3">
                <div className="flex">
                    <div className="w-2/6">Subject</div>
                    <div className="w-2/6 text-right">Tags</div>
                    <div className="w-1/6 text-right">Articles</div>
                    <div className="w-1/6 text-right"></div>
                </div>
                {subjects.map((subject) => {
                    return (
                        <Subject subject={subject} />
                    )
                })}
            </div>
        </div>
    )
}