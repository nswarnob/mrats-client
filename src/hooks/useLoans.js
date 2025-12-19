import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../api/axiosPublic";

const useLoans = () => {
  return useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axiosPublic.get("/loans");
      return res.data;
    },
  });
};

export default useLoans;
