import { signIn } from "next-auth/react";
import { Avatar, Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";

export default function LoginButton() {
    return (
        <Popover>
            <PopoverTrigger>
                <Button colorScheme="teal">Login</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader><h3 className="texl-lg font-bold">Login/Register to BOC</h3></PopoverHeader>
                <PopoverBody>
                    <div onClick={()=>signIn('google')} className="rounded cursor-pointer hover:bg-slate-100 my-1 shadow-sm p-3 text-center">
                        <Avatar src="https://res.cloudinary.com/dsfybjdih/image/upload/v1716300429/boc_media/google_a73iuy.png" size='sm'/> Login With Google
                    </div>
                    <div onClick={()=>signIn('github')} className="rounded cursor-pointer hover:bg-slate-100 my-1 shadow-sm p-3 text-center">
                        <Avatar src="https://res.cloudinary.com/dsfybjdih/image/upload/v1716300429/boc_media/github_gzxwy2.png" size='sm'/> Login With Github
                    </div>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}