'use client';

import { SearchIcon } from "@chakra-ui/icons";
import { Button, FormControl, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

export default function SearchField() {
    return (
        <FormControl>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.500' />
                </InputLeftElement>
                <Input placeholder="Search" />
            </InputGroup>
        </FormControl>
    )
}