
import React from 'react'
import Link from "next/link"
import RemovePost from './RemovePost';



const getProducts=async()=>{
  try{
    const res=await fetch("http://localhost:3002/api/posts",{
      cache:"no-store"
    });
    if(!res.ok){
      throw new Error("product not getting..")
    }
    return res.json();
  }catch(err){
    console.log(err)
  }

}

export const ProductList = async () => {
  const data= await getProducts()


 
  return (
    <div>
         <h2 className='text-2xl font-semibold py-10'>Nextjs crud(create,read,update and delte)</h2>
        <div className='text-right'>
            <Link className='bg-blue-600 text-white rounded-lg px-3 py-2' href={"/addPost"}> Add Post</Link>

          
        </div>
        <div className="relative overflow-x-auto py-5">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    content
                </th>
            </tr>
        </thead>
        <tbody>
            {data?.map((item:any)=>(
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                  <td className="px-6 py-4">
                      {item.name}
                  </td>
                  <td className="px-6 py-4">
                      {item.title}
                  </td>
                  <td className="px-6 py-4">
                      {item.content}
                  </td>
                  <td>
                    <div className='flex '>
                   <Link href={`/editPost/${item.id}`}>   <button className='bg-green-500 text-white py-2 px-3 rounded-md mr-5'>Edit</button></Link> 
                       {/* <RemoveProduct id={item._id}/> */}
                       <RemovePost id={item.id}/>
                
                    </div>
                  </td>
              </tr>

            ))}
          
          
        
        </tbody>
    </table>
</div>
    </div>
  )
}
