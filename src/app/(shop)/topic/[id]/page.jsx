"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getPostsByTopic } from "@/services/postService";

export default function TopicPage({ params }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getPostsByTopic(params.id);
      setPosts(res);
    };
    fetchPosts();
  }, [params.id]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Chủ đề</h1>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.post_id}
            href={`/posts/${post.post_id}`}
            className="p-6 border rounded-xl hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
