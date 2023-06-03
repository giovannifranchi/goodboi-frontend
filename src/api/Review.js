import Ajax from './Ajax';

const Review = {
    put: (data, token)=>{
        return Ajax.put(`/manualRevision/${data.id}/${data.currentDetector}/${data.revSate}`, {token});
    }
}

export default Review;