import Ajax from "./Ajax";


const Detector = {
    getDetectorList: (token)=> {
        return Ajax.get('/detectorslist', {token});
    },

    getDetectorCount: (token, detectorName, revState)=>{
        return Ajax.get(`/hitscount/${detectorName}/${revState}`, {token});
    }
}


export default Detector;