'use client';

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

export default function Logout(){
    return(
        <Button size='sm' onClick={()=>signOut()} colorScheme="red">Logout</Button>
    )
}