import { Badge } from "@chakra-ui/react"

export default function UserRoleBadge({ role }: { role: string }) {
    switch (role) {
        case 'Moderator':
            return <Badge className="m-1" colorScheme="green">{role}</Badge>
        case 'Writer':
            return <Badge className="m-1" colorScheme="blue">{role}</Badge>
    }
}