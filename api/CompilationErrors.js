import axios from "axios";

const CompilationErrors = {
    getCompilationErrors: async (token)=>{
        const endpoint = `${import.meta.env.VITE_BASE_URI}/api/compilationErrors`;
        const headers = {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            authtoken: token,
        };
        const response = await axios.get(endpoint, {headers});
        return response.data;
    }
};

export default CompilationErrors;