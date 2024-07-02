import { PrismaClient } from "@prisma/client";
import AddSubject from "@/components/admin/subjects/AddSubject";
import SubjectsList from "@/components/admin/subjects/SubjectsList";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Icon
} from '@chakra-ui/react'
import { BsChevronBarRight } from "react-icons/bs";
import SubjectsNav from "@/components/admin/subjects/Nav";

const prisma = new PrismaClient()

export default async function SubjectsPage() {
    const subjects = await prisma.subject.findMany({
        select: {
            name: true,
            topics: true,
            articles: true,
        }
    })
    prisma.$disconnect()
    return (
        <div className="p-2 md:lg:xl:p-3">
            <AddSubject />
            <SubjectsList subjects={subjects} />
        </div>
    )
}