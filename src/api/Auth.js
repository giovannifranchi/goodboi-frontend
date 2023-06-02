import Ajax from "./Ajax";

const Auth = {
    login: (data)=> {
        return Ajax.post('/login', data);
    }
}

export default Auth;