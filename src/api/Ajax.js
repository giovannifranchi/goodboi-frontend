import axios from "axios";
import Header from "./Header";



const baseURL = import.meta.env.VITE_BASE_URL;


const ajaxRequest = async(config)=> {

    config.baseURL = baseURL;

    config.headers = {};

    switch(config.method){
        case 'GET':
            Header.get.authtoken = config.token;
            config.headers = Header.get;
            break;
        case 'POST':
            config.headers = Header.post;
            console.log('post switch entered');
            break;        
    }


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
    },

    post: (endpoint, params, config = {})=> {
        config = {
            ...config,
            ...{
                url: endpoint,
                method: 'POST',
                data: params
            }
        }
        return ajaxRequest(config);
    }
}


export default Ajax;


