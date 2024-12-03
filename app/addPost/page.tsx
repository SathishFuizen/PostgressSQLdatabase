'use client'
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  name: string;
  title: string;
  content: string; // Keeping the 'content' field as in the state
}

export default function Page() {
  const [data, setData] = useState<FormData>({
    name: '',
    title: "",
    content: ""
  });
  
  const { name, title, content } = data;
  const router = useRouter();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3002/api/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ name, title, content }) // Updated fields
      });
      if (res.ok) {
        router.push("/products");
        router.refresh();
        alert("hello")
      } else {
        throw new Error("Failed to create product.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h3 className='text-lg font-semibold'>Add New Product</h3>
      <div className='py-10'>
        <form className="max-w-sm mx-auto" onSubmit={onSubmitHandler} autoComplete='off'>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input 
              type="text" 
              id="name" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required 
              value={name} 
              name="name" 
              onChange={onChangeHandler} 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input 
              type="text" 
              id="title" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required 
              value={title} 
              name="title" 
              onChange={onChangeHandler} 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
            <input 
              type="text" 
              id="content" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              required 
              value={content} 
              name="content" 
              onChange={onChangeHandler} 
            />
          </div>
          <button 
            type="submit" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
