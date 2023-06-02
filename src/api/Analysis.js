import Ajax from "./Ajax";

const Analysis = {
    getAnalysisCount: (token, currentDetector)=>{
        return Ajax.get(`/analysiscount/${currentDetector}`, {token});
    }
}


export default Analysis;