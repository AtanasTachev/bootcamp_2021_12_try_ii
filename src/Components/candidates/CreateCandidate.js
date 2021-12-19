import { useNavigate } from 'react-router-dom';
import * as candidateService from '../../services/candidateService';

import './form.css';

const CreateCandidate = () => {

    const navigate = useNavigate();
    
    const onCandidateCreate = (e) => {
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
            <h2>Let's create a candidate</h2>
            <p>Create a candidate step by step.</p>
        </div>
        <form method="POST" className="loginForm" onSubmit={onCandidateCreate}>
            <h2>Create Project</h2>
            <ul className="noBullet">
                <li>
                    <label htmlFor="title">First Name:</label>
                    <input type="text" className="inputFields" id="firstName" name="firstName" placeholder="John" />
                </li>

                <li>
                    <label htmlFor="title">Last Name:</label>
                    <input type="text" className="inputFields" id="lastName" name="lastName" placeholder="Smith" />
                </li>
                
                <li>
                    <label htmlFor="description">Email:</label>
                    <input type="email" className="inputFields" id="email" name="email" placeholder="johnsmith@gmail.com" />
                </li>

                <li id="center-btn">
                    <button id="login-btn">Create Candidate</button>
                </li>
            </ul>
        </form>
    </div>

</section>
    )
}

export default CreateCandidate;