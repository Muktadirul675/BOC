'use client';

import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent, useContext, useRef, useState } from "react";
import { ArticleAddContextType, Context } from "./ArticleAddForm";

export default function CoverImageField() {
    const [isError, setIsError] = useState<boolean>(false)
    const { updateThumbnail } = useContext(Context) as ArticleAddContextType;
    return (
        <FormControl isInvalid={isError}>
            <FormLabel>
                Thumbnail
            </FormLabel>
            <Input name="thumbnail" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.files) {
                    const file = event.target.files[0]
                    updateThumbnail(file);
                    console.log(event.target.files[0].size)
                    if (file.size > 512000) {
                        event.target.value = ''
                        setIsError(true);
                    } else {
                        setIsError(false);
                    }
                }
            }} type="file" accept="image/*" />
            <FormHelperText>
                The image thumbnail for your article. It is recommended to use a thumbnail. <b>The thumbnail size should not exceed 200Kb</b>. <br />
                If you don't have any image, you can skip this.
            </FormHelperText>
            <FormErrorMessage>Image discarded. Size too big. Image size should be no more than 200kb</FormErrorMessage>
        </FormControl>
    )
}