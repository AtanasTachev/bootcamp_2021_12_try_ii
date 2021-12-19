import { useNavigate } from 'react-router-dom';
import * as candidateService from '../../services/candidateService';

import './form.css';

const EditCandidate = () => {

    const navigate = useNavigate();

    const [candidate, setCandidate] = useState({});
    const navigate = useNavigate();
    const {candidateId} = useParams();


    useEffect(()=> {
        candidateService.getOne(candidateId)
        .then(result => {
            setCandidate(result);
        })
    }, [jobId]);
    
    const onCandidateEdit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');
        let email = formData.get('email');

        candidateService.create({firstName, lastName, email}).then(result => {
            navigate('/candidates');
        })
    }   

return (
    <section id="login-page">

    <div className="loginSection">
        <div className="info">
            <h2>Let's edit a candidate</h2>
            <p>Edit a candidate step by step.</p>
        </div>
        <form method="POST" className="loginForm" onSubmit={onCandidateEdit}>
            <h2>Create Project</h2>
            <ul className="noBullet">
                <li>
                    <label htmlFor="title">First Name:</label>
                    <input type="text" className="inputFields" id="firstName" name="firstName" placeholder="John" defaultValue={candidate.firstName || ''}/>
                </li>

                <li>
                    <label htmlFor="title">Last Name:</label>
                    <input type="text" className="inputFields" id="lastName" name="lastName" placeholder="Smith" defaultValue={candidate.lastName || ''}/>
                </li>
                
                <li>
                    <label htmlFor="description">Email:</label>
                    <input type="email" className="inputFields" id="email" name="description" placeholder="johnsmith@gmail.com" defaultValue={candidate.email || ''}/>
                </li>

                <li id="center-btn">
                    <button id="login-btn">Edit Candidate</button>
                </li>
            </ul>
        </form>
    </div>

</section>
    )
}

export default EditCandidate;