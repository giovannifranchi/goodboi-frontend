import axios from "axios";

const Tables = {
    getTables: async(token, query)=>{
        const endpoint = `${import.meta.env.VITE_BASE_URI}/api/hits/${query.detector}/${query.revState}/${query.offset}`;
        const headers = {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            authtoken: token,
        };
        const response = await axios.get(endpoint, {headers});
        return response.data;
    }
};


export default Tables;