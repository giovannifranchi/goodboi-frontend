import Ajax from "./Ajax";

const Analysis = {
    get: (token, currentDetector)=>{
        return Ajax.get(`/analysiscount/${currentDetector}`, {token});
    }
}


export default Analysis;