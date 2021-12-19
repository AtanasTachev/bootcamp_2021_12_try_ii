import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import * as jobService from '../../services/jobService';

import './form.css';

const EditJob = () => {

    const [job, setJob] = useState({});
    const navigate = useNavigate();
    const {jobId} = useParams();


    useEffect(()=> {
        jobService.getOne(jobId)
        .then(result => {
            setJob(result);
        })
    }, [jobId]);
    
    const onJobEdit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let title = formData.get('title');
        let description = formData.get('description');
        
        await jobService.edit(jobId, title, description).then(result => {
            navigate('/jobs');
        })
    }   

return (
    <section id="login-page">

    <div className="loginSection">
        <div className="info">
            <h2>Let's edit a job</h2>
            <p>Edit a job step by step.</p>
        </div>
        <form method="POST" className="loginForm" onSubmit={onJobEdit}>
            <h2>Edit Project</h2>
            <ul className="noBullet">
                <li>
                    <label htmlFor="title">Title:</label>
                    <input type="text" className="inputFields" id="title" name="title" placeholder="My Job" defaultValue={job.title || ''} />
                </li>
                
                <li>
                    <label htmlFor="description">Description:</label>
                    <input type="text" className="inputFields" id="description" name="description" placeholder="Description" defaultValue={job.description || ''}/>
                </li>

                <li id="center-btn">
                    <button id="login-btn">Edit Job</button>
                </li>
            </ul>
        </form>
    </div>

</section>
    )
}

export default EditJob;