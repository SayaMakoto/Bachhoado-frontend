"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPageById } from "@/services/pageService";

export default function PageDetail() {
  const { id } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await getPageById(id);
        setPage(data);
      } catch (err) {
        console.error("Lỗi load page:", err);
      }
    };

    if (id) fetchPage();
  }, [id]);

  if (!page) {
    return <div className="p-10 text-gray-500">Đang tải...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
