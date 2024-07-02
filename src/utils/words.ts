export function truncate(text:string, count: number){
    if(text.length <= count) return text
    return text.substring(0,count) + "...";
}