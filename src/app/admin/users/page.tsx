import UserTable from "@/components/admin/users/UserTabel";
import { Avatar } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface Role{
    id: string;
    name: string;
}

interface User{
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    roles: Role[];
}

export default async function UsersPage(){
    const users : User[] = await prisma.user.findMany({include:{roles:true}})

    return(
        <div className="p-1">
            <div className="w-full lg:w-4/6 lg:xl:md:mx-auto rounded shadow">
                <div className="rounded-t flex items-center p-3 font-bold texl-md bg-slate-200">
                    Users
                </div>
                <UserTable users={users}/>
            </div>
        </div>
    )
}