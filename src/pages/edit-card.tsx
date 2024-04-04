import { useParams } from 'react-router-dom';
const EditCardPage = () => {
    const { cardId } = useParams();
    return(
        <>
            Edit Card #{cardId}
        </>
    )
}

export default EditCardPage;