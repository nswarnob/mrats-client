import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../api/axiosPublic";

const useLoan = (id) => {
  return useQuery({
    queryKey: ["loan", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/loans/${id}`);
      return res.data;
    },
  });
};

export default useLoan;
