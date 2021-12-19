import { useNavigate } from 'react-router-dom';
import * as jobService from '../../services/jobService';

import './form.css';

const CreateJob = () => {

    const navigate = useNavigate();
    
    const onJobCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let title = formData.get('title');
        let description = formData.get('description');
        jobService.create({title, description}).then(result => {
            navigate('/jobs');
        })
    }   

return (
    <section id="login-page">

    <div className="loginSection">
        <div className="info">
            <h2>Let's create a job</h2>
            <p>Create a job step by step.</p>
        </div>
        <form method="POST" className="loginForm" onSubmit={onJobCreate}>
            <h2>Create Project</h2>
            <ul className="noBullet">
                <li>
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="inputFields" id="title" name="title" placeholder="My Job" />
                </li>
                
                <li>
                    <label htmlFor="description">Description:</label>
                    <input type="text" className="inputFields" id="description" name="description" placeholder="Description" />
                </li>

                <li id="center-btn">
                    <button id="login-btn">Create Job</button>
                </li>
            </ul>
        </form>
    </div>

</section>
    )
}

export default CreateJob;