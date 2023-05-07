import axios from "axios";

const path = '/api/login';

const baseUri = process.env.BASE_URI;

const endpoint = `${baseUri}${path}`;

const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}


const loginPost = (payload)=>{
    axios.post(endpoint, payload, {headers}).then((result)=> {
        return result.data;
    })
}


export default loginPost;