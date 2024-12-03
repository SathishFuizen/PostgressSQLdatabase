import { NextResponse } from 'next/server';
import prisma from '@/app/db/page';

// Named export for the GET method
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 }); // Use NextResponse for JSON response
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 }); // Handle error response
  }
}


export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, title, content } = data;

    const newPost = await prisma.post.create({
      data: {
        name,
        title,
        content
      }
    });
    return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}

// export async function DELETE(req:any){
//   try{
//     const id=req.nextUrl.searchParams.get("id")
//     if (!id){
//       return NextResponse.json({message:"error"},{status:400})
//     }
//     const delted=await prisma.post.delete({
//       where:{
//         id:Number(id)
//       }
//     })
//     return NextResponse.json({message:"deleted successfully..",post:delted},{status:200})
//   }catch(error){
//     return NextResponse.json({message:"error"},{status:500})
//   }

// }


export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "error" }, { status: 400 });
  }

  try {
    const deleted = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json({ message: "deleted successfully", post: deleted }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
