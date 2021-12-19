import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';

import * as candidateService from '../../services/candidateService';
import './card.css';

const ProjectCard = ({candidate}) => {

    const navigate = useNavigate();

    const deleteHandler = (e) => {
        e.preventDefault();
        
        candidateService.deleteCandidate( candidate._id )
        .then(() => {
            navigate('/candidates');
        })
    }

    return (
        <li className="h2tag">
            <h4>First Name: {candidate.firstName}</h4>
            <h4>Last Name: {candidate.lastName}</h4>
            <p>email: {candidate.email}</p>

            <Link className="atag" to={`/candidates/edit/${candidate._id}`}>Edit</Link>
            <Link className="atag" to={`/candidates/delete/${candidate._id}`} onClick={deleteHandler}>Delete</Link>
        </li>
    );
};

export default ProjectCard;