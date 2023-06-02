import Ajax from "./Ajax";

const Error = {
    get: (token)=> {
        return Ajax.get('/compilationErrors', {token});
    }
}

export default Error