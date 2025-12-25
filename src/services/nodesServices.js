import axios from "axios";

export const nodeServices = {
  addPipeline: async (body) => {
    try {
      const response = await axios.post("/pipelines/parse", body);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
