import Image from "next/image";


export default function Article({article}:{article:Article}){
    return(
        <div>
            {article.title}
            {article.coverImage ? <Image width={100} height={100} src={`/uploads/articles/thumbnails/${article.coverImage}`} alt="Image"/> : null}
        </div>
    )
}