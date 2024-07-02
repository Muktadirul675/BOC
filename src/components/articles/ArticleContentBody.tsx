'use client';

function truncateFromHtml(string: string, letters: number) {
    const htmlEl = document.createElement('div')
    htmlEl.innerHTML = string
    let text = htmlEl.innerText
    return `${text.substring(1, letters)}...`
}

export default function ArticleContentBody({ content }: { content: string }) {
    return (
        <p className="text-sm text-gray-500 my-1">
            {truncateFromHtml(content, 500)}
        </p>
    )
}

