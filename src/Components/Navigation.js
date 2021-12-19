import '../App.css';
import {Link} from 'react-router-dom'
import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';



const Navigation = () => {

    const { user } = useContext(AuthContext);

    return (<nav className="nav">
        <Link to="/" className="h2tag"> Recruitment Tool </Link>
        <ul> 
            <Link to="/jobs" className="atag">ALL JOBS</Link>
            <Link to="/jobs/create" className="atag">Create JOB</Link>
            <Link to="/candidates" className="atag">ALL CANDIDATES</Link>
            <Link to="/candidates/create" className="atag">Create CANDIDATE</Link>
            <Link to="/interviews" className="atag">ALL INTERVIEWS</Link>
            <Link to="/interviews/create" className="atag">Create INTERVIEW</Link>
        </ul>
    </nav>);
}

export default Navigation