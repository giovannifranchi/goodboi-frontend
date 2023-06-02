import Ajax from "./Ajax";

const Contract = {

    get: (token)=>{
        return Ajax.get('/contracts', {token});
    },

    get24: (token)=>{
        return Ajax.get('/contracts24h', {token});
    },

    getFlagged: (token)=>{
        return Ajax.get('/contractsFlagged', {token});
    }
}

export default Contract;