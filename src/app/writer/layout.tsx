import { auth } from "@/auth";
import { Avatar, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BsHouse } from "react-icons/bs";

interface Prop {
    children: React.ReactNode,
}

export default async function WriterLayout(props: Prop) {
    const session = await auth()
    return (
        <>
            <div className="container hidden md:lg:xl:flex">
                <div className="w-[20%] p-3">
                    <div className="flex flex-wrap w-ful items-center">
                        <div className="m-2">
                            <Avatar size="lg" src={session?.user?.image as string} name={session?.user?.name as string} />
                        </div>
                        <h3 className="texl-lg">
                            {session?.user?.name as string}
                        </h3>
                    </div>
                    <div className="my-5 p-3">
                        <div className="my-4">
                            <Link href="/writer">
                                Overview
                            </Link>
                        </div>
                        <div className="my-4">
                            <Link href="/writer">
                                Articles
                            </Link>
                        </div>
                        <div className="my-4">
                            <Link href="/writer">
                                Drafts
                            </Link>
                        </div>
                        <div className="my-4">
                            <Link href="/writer">
                                Feedbacks
                            </Link>
                        </div>
                        {/* <div className="my-2">
                            Articles
                        </div> */}
                    </div>
                </div>
                <div className="w-[80%] p-3">
                    {props.children}
                </div>
            </div>
            <div className="md:xl:lg:hidden w-full p-3 fixed bottom-[18px] left-0">
                <div className="w-full flex justify-center items-center bg-slate-100 rounded border border-slate-200 p-3">
                    <div className="rounded-full mx-3 hover:bg-slate-200 transition-all p-3">
                        <BsHouse/>
                    </div>
                    <div className="rounded-full mx-3 hover:bg-slate-200 transition-all p-3">
                        <BsHouse/>
                    </div>
                    <div className="rounded-full mx-3 hover:bg-slate-200 transition-all p-3">
                        <BsHouse/>
                    </div>
                    <div className="rounded-full mx-3 hover:bg-slate-200 transition-all p-3">
                        <BsHouse/>
                    </div>
                </div>
            </div>
        </>
    )
}