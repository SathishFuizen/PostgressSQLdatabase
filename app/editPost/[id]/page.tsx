import React from 'react'
import { EditPost } from '@/components/EditPost'

const getdata=async(id:string)=>{
    try{
        const res=await fetch(`http://localhost:3002/api/posts/${id}`)
        if(!res.ok){
            throw new Error("error")
        }
        return res.json()

    
    }catch(error){
      console.log(error)
    }
  
}

const page = async ({params}:{params:{id:string}}) => {
    const {id}= params;

    const data= await getdata(id);

   
  return (
    <div className='flex justify-center items-center'>
      <EditPost id={data.post.id} name={data.post.name} title={data.post.title} content={data.post.content}/>
    

</div>
  )
}

export default page