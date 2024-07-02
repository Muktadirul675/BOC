'use client';

import Link from 'next/link';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function PreviewInfo({ id }: { id: string }) {
    const router = useRouter()
    return (
        <div className="mb-5 mt-1 rounded border border-blue-300 bg-blue-200 p-3">
            Your article has been saved as draft. You can edit it when ever you want. Once ready, you can publish it. After you click publish , a moderator will go through your article. If the article is as per our rules, it will be published publicly. Thanks for contributing! <br /> <br />
            <Button onClick={()=>router.push(`/articles/${id}/title`)} colorScheme="blue" size="sm">Edit</Button>
            <span className="mx-1"></span>
            <Button colorScheme="blue" size="sm">Publish</Button>
            {/* <div className="mx-1"></div>
        <Button colorScheme="blue" size="sm">Go to profile</Button> */}
        </div>
    )
}