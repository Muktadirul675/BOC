import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

export default function TitleField() {
    const [input, setInput] = useState<string>()

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>){
        setInput(e.target.value)
    }

    const isError = input === ''

    return (
        <FormControl isInvalid={isError} isRequired>
            <FormLabel>Ttile</FormLabel>
            <Textarea name="title" resize={'none'} value={input} onChange={handleChange}/>
            <FormHelperText>This title will be shown to your user. Try to make this single lined, meaningful and attractive!</FormHelperText> 
            <FormErrorMessage>Title can't be empty</FormErrorMessage>
        </FormControl>
    )
}