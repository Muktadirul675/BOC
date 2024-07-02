'use client';

import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export default function SubjectsNav() {
    return (
        <Breadcrumb className="mb-2" spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
            <BreadcrumbItem>
                <BreadcrumbLink href='/admin'>Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <BreadcrumbLink href='/admin/subjects'>SubjectsHhh</BreadcrumbLink>
            </BreadcrumbItem>Subjects
        </Breadcrumb>
    )
}