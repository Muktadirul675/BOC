import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useContext, useState } from "react";
import { ArticleAddContextType, Context } from "./ArticleAddForm";

export default function ContentField() {
    const { updateContent } = useContext(Context) as ArticleAddContextType
    const [input, setInput] = useState<string>()

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setInput(e.target.value)
        updateContent(e.target.value)
    }

    const isError = input === '' || input === null

    return (
        <FormControl isInvalid={isError} isRequired>
            <FormLabel>Content</FormLabel>
            <Textarea name="content" value={input} onChange={handleChange} />
            <FormHelperText>Your article's content</FormHelperText>
            <FormErrorMessage>Content can't be empty</FormErrorMessage>
        </FormControl>
    )
}