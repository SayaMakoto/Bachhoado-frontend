"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/services/postService";
import Link from "next/link";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts({ trash: 0 });
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">📰 Blog</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.post_id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold line-clamp-2">{post.title}</h2>

            <p className="text-gray-600 mt-3 line-clamp-3">{post.content}</p>

            <Link
              href={`/posts/${post.post_id}`}
              className="inline-block mt-4 text-green-600 font-medium hover:underline"
            >
              Đọc tiếp →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
