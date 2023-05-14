import axios from "axios";

const AnalysisCount = {
    getAnalysisCount: async(token, query)=>{
        const endpoint = `${import.meta.env.VITE_BASE_URI}/api/analysisCount/${query}`;
        const headers = {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            authtoken: token,
        };
        const response = await axios.get(endpoint, {headers});
        return response.data;
    }
}

export default AnalysisCount;