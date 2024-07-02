'use client';

import { Key } from "react";

export default function TopicsList({topics}:{topics: Topic[]}){
    return(
        <div className="w-full md:w-3/4 lg:xl:w-2/6 mx-auto my-1 rounded shadow">
            <div className="p-3 rounded-t bg-slate-200">
                <h3 className="font-bold text-md">
                    Topics
                </h3>
            </div>
            <div className="p-2 md:lg:xl:p-3">
                <div className="flex">
                    <div className="w-2/6">Tagname</div>
                    <div className="w-2/6 text-right">Subject</div>
                    <div className="w-2/6 text-right">Articles</div>
                </div>
                {topics.map((topic)=>{
                    return(
                        <div key={topic.id as Key} className="flex p-2 hover:bg-slate-50">
                            <div className="w-2/6">{topic.name}</div>
                            <div className="w-2/6 text-right">{topic.subject?.name}</div>
                            <div className="w-2/6 text-right">{topic.articles?.length}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}