"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPostById } from "@/services/postService";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="p-10">Đang tải...</div>;
  if (!post) return <div className="p-10">Không tìm thấy bài viết</div>;

  return (
    <div>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
        <div>{post.content}</div>
      </div>
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 
                   text-green-600 font-medium 
                   hover:text-green-800 transition"
      >
        ← Quay lại
      </button>
    </div>
  );
}
