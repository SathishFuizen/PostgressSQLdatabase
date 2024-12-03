import { NextResponse } from 'next/server';
import prisma from '@/app/db/page';

export async function GET(req:Request,{params}:{params:{id:string}}){
    const {id}=params;
    try{
        const res= await prisma.post.findUnique({
            where:{
                id:Number(id)
            }
        })
        return NextResponse.json({message:"get post",post:res},{status:200})
    }catch(error){
        return NextResponse.json({message:"error"},{status:500})
    }


}

export async function PUT(req:Request,{params}:{params:{id:string}}){
    const {id}=params;
    const {name,title,content}=await req.json()
    try{
        const res=await prisma.post.update({
            where:{
                id:Number(id)
            },
            data:{
                name,
                title,
                content
            }
        })
        return NextResponse.json({message:"updated post sucessfully...",post:res},{status:200})
        
    }catch(error){
        console.log(error)
    }

}