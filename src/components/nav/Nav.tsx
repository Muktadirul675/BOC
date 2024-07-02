'use client';

import { Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import ProfileButton from "./ProfileButton";
import Image from "next/image";

function AuthButton({ status }: { status: string }) {
    switch (status) {
        case 'authenticated':
            return <ProfileButton />
        case 'unauthenticated':
            return <LoginButton />
        case 'loading':
            <Spinner />
    }
}

export default function Nav() {
    const session = useSession();
    return (
        <div className="w-full flex sticky top-0 justify-center p-3 items-center shadow mb-3 z-50 bg-white">
            <div className="container flex py-3 rounded items-center justify-start">
                <Link href="/"><Image src="https://res.cloudinary.com/dsfybjdih/image/upload/v1716140187/BOC_Logo_lyhis3.png" alt="Logo" height={50} width={50} /></Link>
                <div className="ms-auto flex items-center">
                    <Link href="/search"><Image src="https://res.cloudinary.com/dsfybjdih/image/upload/v1716182402/boc_media/search_obmkaa.png" alt="Search" height={27} width={27} /></Link>
                    <span className="mx-3"></span>
                    <Link href="/notifications"><Image src="https://res.cloudinary.com/dsfybjdih/image/upload/v1716182142/boc_media/bell_2_in6qbm.png" alt="bell" height={27} width={27} /></Link>
                    <span className="mx-3"></span>
                    <AuthButton status={session.status} />
                </div>
            </div>
        </div>
    )
}