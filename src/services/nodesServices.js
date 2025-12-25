import axios from "axios";
import { toast } from "react-toastify";

export const nodeServices = {
  addPipeline: async (body) => {
    try {
      const response = await axios.post("/pipelines/parse", body);
      return response.data;
    } catch (error) {
      toast.error("Server Down! Please try again later");
      console.error(error);
    }
  },
};
