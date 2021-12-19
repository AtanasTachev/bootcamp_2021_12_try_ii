import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

import * as jobService from '../../services/jobService';
import './card.css';

const ProjectCard = ({job}) => {

    const navigate = useNavigate();

    const deleteHandler = (e) => {
        e.preventDefault();
        
        jobService.deleteJob( job._id )
        .then(() => {
            navigate('/jobs');
        })
    }

    return (
        <li className="h2tag">
            <h4>Job Title: {job.title}</h4>
            <p>Description: {job.description}</p>

            <Link className="atag" to={`/jobs/edit/${job._id}`}>Edit</Link>
            <Link className="atag" to={`/jobs/delete/${job._id}`} onClick={deleteHandler}>Delete</Link>
        </li>
    );
};

export default ProjectCard;