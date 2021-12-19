import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

import * as interviewService from '../../services/interviewService';
import './card.css';

const InterviewCard = ({interview}) => {

    const navigate = useNavigate();

    console.log(interview);

    const deleteHandler = (e) => {
        e.preventDefault();
        
        interviewService.deleteInterview( interview._id )
        .then(() => {
            navigate('/interviews');
        })
    }

    return (
        <li className="h2tag">
            <h4>Slot: {interview.slot}</h4>
            <p>job: {interview.job}</p>
            <p>candidate: {interview.candidate}</p>

            <Link className="atag" to={`/interviews/edit/${interview._id}`}>Edit</Link>
            <Link className="atag" to={`/interviews/delete/${interview._id}`} onClick={deleteHandler}>Delete</Link>
        </li>
    );
};

export default InterviewCard;