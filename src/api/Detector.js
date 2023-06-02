import Ajax from "./Ajax";


const Detector = {
    getList: (token)=> {
        return Ajax.get('/detectorslist', {token});
    },

    getCount: (token, detectorName, revState)=>{
        return Ajax.get(`/hitscount/${detectorName}/${revState}`, {token});
    }
}


export default Detector;