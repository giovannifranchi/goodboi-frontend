import Ajax from "./Ajax";

const Table = {
    get: (token, query)=> {
        return Ajax.get(`/hits/${query.detector}/${query.revState}/${query.offset}`, {token});
    }
}

export default Table