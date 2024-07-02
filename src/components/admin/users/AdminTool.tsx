'use client';

import { makeWriter, removeWriter } from '@/app/actions';
import { Button } from '@chakra-ui/react';
import { useFormState, useFormStatus } from "react-dom";

interface CustomResponse {
    type: string,
    message: string
}

interface Role {
    id: string;
    name: string;
}

function FormResponse({ res }: { res: CustomResponse }) {
    return (
        <div>
            {res.type} <br /> {res.message}
        </div>
    )
}

function SubmitButton({ isWriter }: { isWriter: boolean }) {
    let { pending } = useFormStatus()
    let buttonText = isWriter ? 'Remove Admin' : "Make Admin"
    let buttonColor = isWriter ? 'red' : 'blue'
    return (
        <>
            {pending ? <Button isLoading className="me-2" colorScheme={buttonColor} size="xs">{buttonText}</Button> : <Button type="submit" className="me-2" colorScheme={buttonColor} size="xs">{buttonText}</Button>}
        </>
    )
}

function isWriter(roles: Role[]) {
    if (roles.length) {
        for (var i of roles) {
            if (i.name == 'Writer') return true;
        }
    }
    return false;
}

function AddWriter({ id, name }: { id: string, name: string }) {
    const [addState, addAction] = useFormState(makeWriter, { type: '', message: '' })
    return (
        <form action={addAction}>
            {addState.message !== '' ? <FormResponse res={addState as CustomResponse} /> : null}
            <input type="text" name="user_id" defaultValue={id} hidden />
            <input type="text" name="user_name" defaultValue={name} hidden />
            <SubmitButton isWriter={false} />
        </form>
    )
}

function RemoveWriter({ id, name }: { id: string, name: string }) {
    const [remState, remAction] = useFormState(removeWriter, { type: '', message: '' })
    return (
        <form action={remAction}>
            {remState.message !== '' ? <FormResponse res={remState as CustomResponse} /> : null}
            <input type="text" name="user_id" defaultValue={id} hidden />
            <input type="text" name="user_name" defaultValue={name} hidden />
            <SubmitButton isWriter={true} />
        </form>
    )
}

export default function MakeModeratorTool({ id, name, roles }: { id: string, name: string, roles: Role[] }) {
    let writer = isWriter(roles)
    return (
        <>
            {writer ? <RemoveWriter id={id} name={name}/> : <AddWriter id={id} name={name}/>}
        </>
    )
}