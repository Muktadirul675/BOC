'use client';

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Badge, Box, Button } from "@chakra-ui/react";
import ModeratorTool from './ModeratorTool';
import WriterTool from './WriterTool';
import { Key } from "react";
import UserRoleBadge from "@/components/UserRoleBadge";

interface Role {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    roles: Role[];
}

function User({ user }: { user: User }) {
    return (
        <div className="w-full p-3 hover:bg-slate-100 transition-all rounded shadow-sm">
            <div className="flex items-center py-1">
                <Avatar size='sm' src={user.image as string} name={user.name as string} />
                <span className="ms-2">{user.name}</span>
            </div>
            <div>
                <span>{user.email}</span>
            </div>
            <div>
                {user.roles.map((role: Role) => [
                    <UserRoleBadge key={role.name as Key} role={role.name} />
                ])}
            </div>
            <Accordion className="border-0" allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                Actions
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <div className="flex flex-wrap">
                            <ModeratorTool id={user.id as string} name={user.name as string} roles={user.roles} />
                            <WriterTool id={user.id as string} name={user.name as string} roles={user.roles} />
                            <form>
                                <Button className="me-2" colorScheme="red" size="xs">Ban</Button>
                            </form>
                        </div>

                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default function UserTable({ users }: { users: User[] }) {
    return (
        <div className="flex flex-wrap lg:md:xl:p-3">
            {users.map((user) => {
                return (
                    <div key={user.id as Key} className="w-full md:w-2/6 lg:xl:w-1/4">
                        <User user={user} />
                    </div>
                )
            })}
        </div>
    )
}