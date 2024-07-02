import Image from "next/image";

export default function Actions() {
    return (
        <div className="rounded my-1 shadow">
            <div className="rounded-t bg-slate-200 p-3">
                <b className="text-sm">YOU CAN ALSO-</b>
            </div>
            <div className="p-3">
                <a href="" className="flex p-3 rounded hover:bg-slate-100 transition-all">
                    <Image src="https://res.cloudinary.com/dsfybjdih/image/upload/v1716035527/boc_media/request_koeuji.png" height={30} width={30} alt="Writer" /> <span className="mx-2">Request for an article</span>
                </a> <hr />
                <a href="" className="flex p-3 rounded hover:bg-slate-100 transition-all">
                    <Image src="https://res.cloudinary.com/dsfybjdih/image/upload/v1716034511/boc_media/writer_r0lbcf.png" height={30} width={30} alt="Writer" /> <span className="mx-2">Be a writer</span>
                </a> <hr />
                <a href="" className="flex p-3 rounded hover:bg-slate-100 transition-all">
                    <Image src="https://res.cloudinary.com/dsfybjdih/image/upload/v1716034509/boc_media/problem_z3tipn.png" height={30} width={30} alt="Writer" /> <span className="mx-2">Report an issue</span>
                </a>
            </div>
        </div>
    )
}