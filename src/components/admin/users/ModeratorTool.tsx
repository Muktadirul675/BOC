'use client';

import { makeModerator, removeModerator } from '@/app/actions';
import { Button } from '@chakra-ui/react';
import { useFormState, useFormStatus } from "react-dom";
import { isModerator } from '@/utils/moderator';

interface CustomResponse {
    type: string,
    message: string
}

function FormResponse({ res }: { res: CustomResponse }) {
    return (
        <div>
            {res.type} <br /> {res.message}
        </div>
    )
    // switch (res.type) {
    //     case 'success':
    //         return (
    //             <Alert status='success'>
    //                 <AlertIcon />
    //                 <AlertTitle>{res.type}</AlertTitle>
    //                 <AlertDescription>{res.message}</AlertDescription>
    //             </Alert>
    //         )
    //     case 'error':
    //         return (
    //             <Alert status='error'>
    //                 <AlertIcon />
    //                 <AlertTitle>{res.type}</AlertTitle>
    //                 <AlertDescription>{res.message}</AlertDescription>
    //             </Alert>
    //         )
    //     case 'info':
    //         return (
    //             <Alert status='info'>
    //                 <AlertIcon />
    //                 <AlertTitle>{res.type}</AlertTitle>
    //                 <AlertDescription>{res.message}</AlertDescription>
    //             </Alert>
    //         )
    // }
}

function SubmitButton({ isModerator }: { isModerator: boolean }) {
    let { pending } = useFormStatus()
    let buttonText = isModerator ? 'Remove Moderator' : "Make Moderator"
    let buttonColor = isModerator ? 'red' : 'blue'
    return (
        <>
            {pending ? <Button isLoading className="me-2" colorScheme={buttonColor} size="xs">{buttonText}</Button> : <Button type="submit" className="me-2" colorScheme={buttonColor} size="xs">{buttonText}</Button>}
        </>
    )
}

function AddModerator({ id, name }: { id: string, name: string }) {
    const [addState, addAction] = useFormState(makeModerator, { type: '', message: '' })
    return (
        <form action={addAction}>
            {addState.message !== '' ? <FormResponse res={addState as CustomResponse} /> : null}
            <input type="text" name="user_id" defaultValue={id} hidden />
            <input type="text" name="user_name" defaultValue={name} hidden />
            <SubmitButton isModerator={false} />
        </form>
    )
}

function RemoveModerator({ id, name }: { id: string, name: string }) {
    const [remState, remAction] = useFormState(removeModerator, { type: '', message: '' })
    return (
        <form action={remAction}>
            {remState.message !== '' ? <FormResponse res={remState as CustomResponse} /> : null}
            <input type="text" name="user_id" defaultValue={id} hidden />
            <input type="text" name="user_name" defaultValue={name} hidden />
            <SubmitButton isModerator={true} />
        </form>
    )
}

export default function MakeModeratorTool({ id, name, roles }: { id: string, name: string, roles: Role[] }) {
    let moderator = isModerator(roles)
    return (
        <>
            {moderator ? <RemoveModerator id={id} name={name}/> : <AddModerator id={id} name={name}/>}
        </>
    )
}