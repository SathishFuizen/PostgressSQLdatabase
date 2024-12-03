'use client'
import React from 'react'
import { useRouter } from 'next/navigation'


const RemovePost = ({id}:any) => {
    const router=useRouter()

    const deltedPost=async()=>{
        const isConfirmed=confirm("Are you sure")
        if (isConfirmed){
            try{
                const res=await fetch(`/api/posts?id=${id}`,{
                    method:"DELETE"
                });
                if(res.ok){
                    router.refresh()
                }
            }catch(error){
                console.log(error)
            }
        }

    }
  return (
   <button className='bg-red-500 text-white px-3 py-2 rounded-lg' onClick={deltedPost}>Deleted</button>
  )
}

export default RemovePost;