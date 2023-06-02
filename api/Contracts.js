import axios from "axios";

const Contracts = {

    async fetchData(token, endpoint) {
        const headers = {
            'Accept': 'application/json',
            "Content-Type": "multipart/form-data",
            'authtoken': token,
        };
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${endpoint}`, {headers});
        return response.data;
    },

    getContracts: async (token) => Contracts.fetchData(token, 'contracts'),

    getContracts24: async (token) => Contracts.fetchData(token, 'contracts24h'),

    getFlaggedContracts: async (token) => Contracts.fetchData(token, 'contractsFlagged'),
};

export default Contracts;
