import { auth } from "@/auth";
import { isModerator } from "@/utils/moderator";
import { isWriter } from "@/utils/writer";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

function PanelModerator() {
    return (
        <div className="flex items-center p-3">
            <b>You are a moderator</b>
            <div className="ms-auto">
                <Link href="/profile">
                    <Button size="sm" colorScheme="blue" className="ms-2">Dashboard</Button>
                </Link>
            </div>
        </div>
    )
}

function PanelWriter() {
    return (
        <div className="flex items-center p-3">
            <b>You are a writer</b>
            <div className="ms-auto">
                <Link href="/profile">
                    <Button size="sm" colorScheme="blue" className="ms-2">Dashboard</Button>
                </Link>
            </div>
        </div>
    )
}

export default async function Panel() {
    const session = await auth()
    console.log(session)
    const user = session?.user
    const moderator = isModerator((user as any).roles)
    const writer = isWriter((user as any).roles)
    console.log('m', moderator, writer)
    if (moderator || writer) {
        return (
            <div className="w-full mb-1 rounded shadow">
                <div className="rounded-t p-3 bg-slate-200">
                    <b className="text-sm">Panel</b>
                </div>
                <div className="p-3">
                    {moderator ? <PanelModerator /> : null}
                    <hr />
                    {writer ? <PanelWriter /> : null}
                </div>
            </div>
        )
    }
    return null;
}