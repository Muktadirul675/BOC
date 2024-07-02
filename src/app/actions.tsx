'use server';

import { auth } from '@/auth';
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

function tagExists(allTags: Object[], tag: string) {
    for (var i of allTags) {
        if ((i as any).name === tag) return true;
    }
    return false;
}

function getTagId(allTags: Object[], tag: string) {
    if (tagExists(allTags, tag)) {
        for (var i of allTags) {
            if ((i as any).name == tag) return (i as any).id
        }
    }
    return null;
}

interface TagToConnect {
    id: string,
}

interface TagToCreate {
    name: string,
}

export async function addSubject(prevState: any, formData: FormData) {
    
    const name = formData.get('subject_name')
    try {
        const res = await prisma.subject.create({
            data: {
                name: name as string
            }
        })
        revalidatePath('/admin/subjects')
        
        return { type: 'success', message: `Added` }
    } catch (error) {
        
        return { type: 'error', message: `${error}` }
    }
}

export async function addTopic(subjectId: string | undefined, prevState: any, formData: FormData) {
    
    const name = formData.get('topic_name') as string
    try {
        const res = await prisma.topic.create({
            data: {
                name: name,
                subject: {
                    connect: { id: subjectId }
                }
            }
        })
        revalidatePath('/admin/topics')
        
        return { type: 'success', message: `Added` }
    } catch (error) {
        
        return { type: 'error', message: `${error}` }
    }
}


// export async function submitArticle(tags:string[],prevState: any, formData: FormData) {
//     

//     const session = await auth();
//     const thumbnail = formData.get('thumbnail') as File
//     if((thumbnail as any).size > 512000) return;

//     const buffer = Buffer.from(await thumbnail.arrayBuffer())
//     const thumbnailName = `${new Date().getDate()}_${new Date().getTime()}_${uuidv4()}_${path.extname(thumbnail.name)}`
//     const thumbnailPath = path.join(process.cwd(), 'public','uploads','articles','thumbnails', thumbnailName)

//     try{
//         await fs.mkdir(path.dirname(thumbnailPath),{recursive:true})
//         await fs.writeFile(thumbnailPath, buffer)
//     }catch(error){
//         console.log('error',error)
//     }

//     const newArticle = await prisma.article.create({
//         data: {
//             title: formData.get('title') as string,
//             content: formData.get('content') as string,
//             coverImage: `${thumbnailName}`,
//             author: {
//                 connect: {
//                     email: session?.user?.email as string
//                 }
//             }
//         },
//         select:{id:true}
//     })

//     for (var tag of tags) {
//         const updateRes = await prisma.article.update({
//             where: { id: newArticle.id },
//             data: {
//                 tags: {
//                     connectOrCreate: {
//                         where: { name: tag },
//                         create: { name: tag }
//                     }
//                 }
//             }
//         })
//     }

//     
//     return {type:'success',message:'created',data:newArticle};
// }

export async function makeModerator(prevState: any, formData: FormData) {
    
    const id = formData.get('user_id') as string
    const name = formData.get('user_name') as string
    // await prisma.user.update({
    //     where:{id:id},
    //     data:{
    //         roles:{
    //             connect:{id:'bocModerator'}
    //         }
    //     },
    //     include:{
    //         roles: true
    //     }
    // })
    // revalidatePath("/admin/users")
    // 
    // return {type:'demo',message:'demo'}
    // console.log(id,name)
    try {
        const res = await prisma.user.update({
            where: { id: id },
            data: {
                roles: {
                    connect: { id: 'bocModerator' }
                }
            },
            include: { roles: true }
        })
        revalidatePath("/admin/users")
        
        return { type: 'success', message: `${name} is a moderator now` }
        // console.log(res)
        // return {type:'error',message:'success'}
    } catch (error) {
        return { type: 'error', message: error }
    }

}

export async function removeModerator(prevState: any, formData: FormData) {
    
    const id = formData.get('user_id') as string
    const name = formData.get('user_name') as string
    try {
        const res = await prisma.user.update({
            where: { id: id },
            data: {
                roles: {
                    disconnect: { id: 'bocModerator' }
                }
            },
            include: { roles: true }
        })
    } catch (error) {
        return { type: 'error', message: error }
    }
    revalidatePath("/admin/users")
    
    return { type: 'info', message: `${name} is not a moderator anymore` }
}

export async function makeWriter(prevState: any, formData: FormData) {
    
    const id = formData.get('user_id') as string
    const name = formData.get('user_name') as string
    try {
        await prisma.user.update({
            where: { id: id },
            data: {
                roles: {
                    connect: { id: 'bocWriter' }
                }
            }
        })
    } catch (error) {
        return { type: 'error', message: error }
    }

    
    revalidatePath("/admin/users")
    return { type: 'success', message: `${name} is a writer now` }
}


export async function removeWriter(prevState: any, formData: FormData) {
    
    const id = formData.get('user_id') as string
    const name = formData.get('user_name') as string
    try {
        await prisma.user.update({
            where: { id: id },
            data: {
                roles: {
                    disconnect: { id: 'bocWriter' }
                }
            }
        })
    } catch (error) {
        return { type: 'error', message: error }
    }

    
    revalidatePath("/admin/users")
    return { type: 'success', message: `${name} is a writer now` }
}



export async function removeAdmin(prevState: any, formData: FormData) {
    
    const id = formData.get('user_id') as string
    const name = formData.get('user_name') as string
    try {
        await prisma.user.update({
            where: { id: id },
            data: {
                roles: {
                    disconnect: { id: 'bocAdmin' }
                }
            }
        })
    } catch (error) {
        return { type: 'error', message: error }
    }

    
    revalidatePath("/admin/users")
    return { type: 'success', message: `${name} is a writer now` }
}



export async function addAdmin(prevState: any, formData: FormData) {
    
    const id = formData.get('user_id') as string
    const name = formData.get('user_name') as string
    try {
        await prisma.user.update({
            where: { id: id },
            data: {
                roles: {
                    disconnect: { id: 'bocAdmin' }
                }
            }
        })
    } catch (error) {
        return { type: 'error', message: error }
    }

    
    revalidatePath("/admin/users")
    return { type: 'success', message: `${name} is a writer now` }
}


export async function addDraft(prevState:any,formData: FormData) {
    const session = await auth();
    const title = formData.get('title') as string
    if(title == ''){
        return {type:'error',message:'Title can\'t be empty',id:null}
    }
    try {
        const draft = await prisma.draftArticle.create({
            data: {
                title: title,
                author:{
                    connect: {email: `${session?.user?.email}`}
                }
            },
            include:{author:true}
        })
        
        return { type: 'success', message: "Draft Created", id:draft.id}
    }catch(e){
        
        return {type:'error',message:e,id:null}
    }
}

export async function updateDraft(prevState:any, formData:FormData){
    const content = formData.get('content') as string;
    if(content == ''){
        return {type:'error',message:'Content can\'t be empty',id:null}
    }
    const id = formData.get('id') as string;
    try{
        await prisma.draftArticle.update({
            where:{id:id},
            data:{
                content:content
            }
        })
        revalidatePath(`/articles/${id}/content`)
        return {type:'success',message:''}
    }catch(e){
        return {type:'error',message:e}
    }
}

export async function updateDraftTitle(prevState:any, formData:FormData){
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    if(title == ''){
        return {type:'error',message:'Title can\'t be empty',id:null}
    }
    try{
        const draft = await prisma.draftArticle.update({
            where:{id:id},
            data:{
                title:title
            },
            select: {id:true}
        })
        revalidatePath(`/articles/${id}/title`)
        return {type:'success',message:'',id:draft.id}
    }
    catch(e){
        return {type:'error',message:e,id:null}
    }
}

export async function updateDraftSubjects(prevState:any, formData:FormData){
    const id = formData.get("id") as string
    const subjects = formData.get("subjects") as string
    if(subjects == ''){
        return {type:'error',message:'You must select at least one subject',id:null}
    }
    let subjectsArr = subjects.split(',').filter((sub)=>sub != '');
    try{
        await prisma.draftArticle.update({
            where:{id:id},
            data:{
                subjects:{
                    set:[]
                }
            }
        })
        for(var i of subjectsArr){
            await prisma.draftArticle.update({
                where:{id:id},
                data:{
                    subjects:{
                        connect:{id:i}
                    }
                }
            })
        }
        revalidatePath(`/articles/${id}/subjects`)
        revalidatePath(`/articles/${id}/topics`)
        return {type:'success',message:'',id:id}
    }catch(e){
        return {type:'error',message:e,id:null}
    }
}

export async function updateDraftTopics(prevState:any, formData:FormData){
    const id = formData.get("id") as string
    const topics = formData.get("topics") as string
    if(topics == ''){
        return {type:'error',message:'You must select at least one topic',id:null}
    }
    let topicsArr = topics.split(',').filter((sub)=>sub != '');
    try{
        await prisma.draftArticle.update({
            where:{id:id},
            data:{
                tags:{
                    set:[]
                }
            }
        })
        for(var i of topicsArr){
            await prisma.draftArticle.update({
                where:{id:id},
                data:{
                    tags:{
                        connect:{id:i}
                    }
                }
            })
        }
        revalidatePath(`/articles/${id}/subjects`)
        revalidatePath(`/articles/${id}/topics`)
        return {type:'success',message:'',id:id}
    }catch(e){
        return {type:'error',message:e,id:null}
    }
}
