import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Tag, TagCloseButton } from "@chakra-ui/react";
import { ChangeEvent, Key, KeyboardEventHandler, useContext, useEffect, useState } from "react";
import { Context } from "./ArticleAddForm";
import { ArticleAddContextType } from "./ArticleAddForm";
import { motion } from "framer-motion";

function ArticleControlledTags() {
    let { tags, updateTags } = useContext(Context) as ArticleAddContextType;
    return (
        <div className="my-1">
            {tags.map((tag: string) => {
                return(
                    <motion.span key={tag as Key}>
                        <Tag className="m-1">
                            {tag}
                            <TagCloseButton onClick={()=>{
                                updateTags(tags.filter((victimTag:string)=>tag !== victimTag))
                            }}/>
                        </Tag>
                    </motion.span>
                )
            })}
        </div>
    )
}

export default function TagsField() {
    const [input, setInput] = useState<string | null>('');
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    let { tags, updateTags } = useContext(Context) as ArticleAddContextType;

    function tagAlreadyIncluded(tag: string){
        for(var i of tags){
            if(i === tag) return true;
        }
        return false;
    }

    function addTag() {
        if (input === '') {
            setErrorMessage('Tag name can\'t be empty')
            setIsError(true);
        } else {
            if(tagAlreadyIncluded(input as string)){
                setErrorMessage('Tag is already included')
                setIsError(true)
            }else{
                updateTags([...tags, input] as string[])
                setInput('')
                setIsError(false)
            }
        }
    }

    return (
        <FormControl isInvalid={isError}>
            <FormLabel>Tags ({tags.length})</FormLabel>
            <ArticleControlledTags />
            <div className="flex">
                <Input className="me-2" onKeyDown={(event) => {
                    if (event.code == 'Enter') addTag()
                }} value={input as string} onChange={handleChange} />
                <Button onClick={addTag} colorScheme="blue">Add</Button>
            </div>
            <FormHelperText>Select or add tags</FormHelperText>
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
    )
}