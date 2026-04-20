import axiosInstance from "@/lib/axiosInstance";

// Lấy tất cả page
export const getPages = async (params = {}) => {
  const res = await axiosInstance.get("/pages", {
    params: params,
  });
  return res.data;
};

// Lấy 1 page theo id
export const getPageById = async (id) => {
  const res = await axiosInstance.get(`/pages/${id}`);
  return res.data;
};

// Tạo page (admin)
export const createPage = async (data) => {
  const res = await axiosInstance.post("/pages", data);
  return res.data;
};

// Cập nhật page
export const updatePage = async (id, data) => {
  const res = await axiosInstance.put(`/pages/${id}`, data);
  return res.data;
};

// Xoá page
export const deletePage = async (id) => {
  const res = await axiosInstance.delete(`/pages/${id}`);
  return res.data;
};
