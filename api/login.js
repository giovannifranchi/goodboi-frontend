import axios from "axios";

const Login = {
  access: async(query)=>{
    const endpoint = `${import.meta.env.VITE_BASE_URI}/api/login`;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
  
    const payload = {
      username: query.username,
      password: query.password,
    };
  
    const response = await axios.post(endpoint, payload, {headers});
  
    return response.data;
  }
}


export default Login;
