import { auth } from "@/auth";
import { Avatar, Badge, Button } from "@chakra-ui/react";
import Logout from "../logout/logout";
import UserRoleBadge from "../UserRoleBadge";

function InfoActions() {
    return (
        <div>
            <Logout/>
        </div>
    )
}

interface HeadProps {
    withAction?: string
}

function RolesList({roles}:{roles: Role[]}){
    return(
        <>
            {roles.map((role)=>{
                return(
                    <UserRoleBadge role={role.name}/>
                )
            })}
        </>
    )
}

export default async function Info(props: HeadProps) {
    const session = await auth();
    const { withAction = true } = props;
    return (
        <div className="w-full mb-1 rounded shadow">
            <div className="rounded-t p-3 bg-slate-200">
                <b className="text-sm">INFO</b>
            </div>
            <div className="flex p-3">
                <div>
                    <Avatar src={session?.user?.image as string} name={session?.user?.name as string} size={"lg"} />
                </div>
                <div className="ms-3">
                    <h3 className="font-bold">{session?.user?.name}</h3>
                    <h6>{session?.user?.email}</h6>
                    {/* {JSON.stringify((session?.user as any).roles)} */}
                    <RolesList roles={(session?.user as any).roles}/>
                    {withAction ? <InfoActions /> : null}
                </div>
            </div>
        </div>

    )
}