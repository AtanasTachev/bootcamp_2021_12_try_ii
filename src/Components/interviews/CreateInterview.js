import { useNavigate } from 'react-router-dom';
import * as interviewService from '../../services/interviewService';

import { useJobsContext } from '../../contexts/JobsContext';
import { useCandidatesContext } from '../../contexts/CandidatesContext';


import './form.css';
const slots = [1,2,3,4,5];

const CreateInterview = () => {

    const navigate = useNavigate();

    let jobs = useJobsContext();
    // let jobs = jobsInfo.jobs;
    let candidates = useCandidatesContext();
    // let candidates = candidatesInfo.candidates;
    console.log(jobs.jobs);
    console.log(candidates.candidates);

    
    const onInterviewCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let jobId = formData.get('job');
        let candidateId = formData.get('candidate');
        let slot = formData.get('slot');

        interviewService.create({jobId, candidateId, slot}).then(result => {
            navigate('/interviews');
        })
    }   

return (
    <section id="login-page">

    <div className="loginSection">
        <div className="info">
            <h2>Let's create an interview</h2>
            <p>Create an interview step by step.</p>
        </div>
        <form method="POST" className="loginForm" onSubmit={onInterviewCreate}>
            <h2>Create Interview</h2>
            <ul className="noBullet">
                <li>
                    <label htmlFor="title">Job:</label>
                    <select type="text" className="inputFields" id="job" name="job">
                         {jobs.jobs.jobs.map(x =><option key={x._id} value={x._id}>{x.title}</option>)} 
                    </select>
                </li>
                
                <li>
                <label htmlFor="title">Candidate:</label>
                    <select type="text" className="inputFields" id="candidate" name="candidate">
                         {candidates.candidates.candidates.map(x =><option key={x._id} value={x._id}>{`${x.firstName} ${x.lastName}`}</option> )}
                    </select>
                </li>

                <li>
                <label htmlFor="slot">Slot:</label>
                    <select type="text" className="inputFields" id="candidate" name="candidate">
                         {slots.map(x =><option key={slots[x]} value={slots[x-1]}>{slots[x-1]}</option>)}
                    </select>
                </li>

                <li id="center-btn">
                    <button id="login-btn">Create Interview</button>
                </li>
            </ul>
        </form>
    </div>

</section>
    )
}

export default CreateInterview;