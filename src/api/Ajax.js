import axios from "axios";
import Header from "./Header";


const baseURL = import.meta.env.VITE_BASE_URL;


const ajaxRequest = async(config)=> {

    config.baseURL = baseURL;

    Header.getHeader.authtoken = config.token;

    config.headers = Header.getHeader;


    return (await axios.request(config)).data;
}

const Ajax = {
    get: (endpoint, config = {})=> {
        config = {
            ...config,
            ...{
                url: endpoint,
                method: 'GET'
            }
        }
        return ajaxRequest(config);
    }
}


export default Ajax;


