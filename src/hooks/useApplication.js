import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../api/axiosPublic";

const useApplications = () => {
  return useQuery({
    queryKey: ["application-loans"],
    queryFn: async () => {
      const res = await axiosPublic.get("/application-loans");
      return res.data;
    },
  });
};

export default useApplications;
