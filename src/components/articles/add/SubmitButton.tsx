'use client';

import { Button, Spinner } from "@chakra-ui/react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    let { pending } = useFormStatus()
    return (
        <>
            {pending ? <Button isLoading type="submit" colorScheme="green">Submit</Button> : <Button type="submit" colorScheme="green">Submit</Button>}
        </>
        // <Button type="submit" colorScheme="green">Submit</Button>
    )
}