'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);  // Correctly set the posts data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1>Saved Posts</h1>
      <ul>
        {posts.map((post:any) => (
          <li key={post.id} className="border-b border-gray-600 p-2">
            <div className="flex justify-between">
              <div className="flex-1">
                <h2 className="font-bold">{post.name}</h2>
                <h2 className="font-bold">{post.title}</h2>
                <h2 className="font-bold">{post.content}</h2>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
