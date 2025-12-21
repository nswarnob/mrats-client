import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../api/axiosPublic";

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
};

export default useUsers;
