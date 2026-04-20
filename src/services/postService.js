import axiosInstance from "@/lib/axiosInstance";

// Lấy tất cả bài viết
export const getPosts = async (filters = {}) => {
  const res = await axiosInstance.get("/posts", {
    params: filters,
  });
  return res.data;
};

// Lấy chi tiết 1 bài
export const getPostById = async (id) => {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data;
};
