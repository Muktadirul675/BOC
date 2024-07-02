import ArticleAddForm from "@/components/articles/add/ArticleAddForm";
import DraftTitle from "@/components/articles/draft/DraftTitle";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function ArticlesAddPage() {
    const subjects = await prisma.subject.findMany()
    return (
        <div className="w-full md:w-3/4 lg:xl:w-1/2 p-3 mx-auto">
            <h3 className="font-bold text-xl">
                Add Article
            </h3>
            <br />
            <DraftTitle subjects={subjects} />
            <br />
            {/* <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                If this is your first article, we recommend you to read this
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Your articles will be saved as draft. You can have as many drafts as you want. <br />
                        You can edit your drafts whenever you want.  <br />
                        If you are ready to go with your article, you have to submit your article for approval. Once your article is being approved, it will be public.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion> */}
            {/* <div className="rounded p-3 border">
                <h3 className="text-md font-bold">If this is your first article, we recommend you to read this</h3>
                <p>
                    Your articles will be saved as draft. You can have as many drafts as you want. <br />
                    You can edit your drafts whenever you want.  <br />
                    If you are ready to go with your article, you have to submit your article for approval. Once your article is being approved, it will be public.
                </p>
            </div> */}
        </div>
    )
}