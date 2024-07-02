import { auth } from "@/auth"
import { Avatar } from "@chakra-ui/react"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function ProfileButton() {
    const session = useSession()
    return (
        <Link href='/profile'>
            <Avatar size="sm" src={`${session.data?.user?.image}`} name={`${session.data?.user?.name}`} />
        </Link>
)
}