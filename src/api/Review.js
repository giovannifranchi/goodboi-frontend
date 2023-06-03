import Ajax from './Ajax';

const Review = {
    put: (data, token)=>{
        return Ajax.put(`/manualRevision/${data.id}/${data.currentDetector}/${data.revState}`, {token});
    }
}

export default Review;