import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useJobsContext } from '../../contexts/JobsContext';
import { useCandidatesContext } from '../../contexts/CandidatesContext';

import * as candidateService from '../../services/candidateService';
import * as jobsService from '../../services/jobService';
import * as interviewService from '../../services/interviewService';




import InterviewCard from './InterviewCard'


const Interviews = () => {

    const { addJobs } = useJobsContext();
    const { addCandidates } = useCandidatesContext();
    const [candidates, setCandidates] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [interviews, setInterviews] = useState([]);




useEffect(() => {
    candidateService.getAll()
    .then(candidateResult => {
        setCandidates(candidateResult);
        addCandidates(candidateResult);
        })
        .catch(error => {
            console.log(error);
        })
}, [addCandidates])

useEffect(() => {
    jobsService.getAll()
    .then(jobsResult => {
        setJobs(jobsResult);
        addJobs(jobsResult);
        })
        .catch(error => {
            console.log(error);
        })
}, [addJobs])

useEffect(() => {
    interviewService.getAll()
    .then(interviewResult => {
        setInterviews(interviewResult);
        })
        .catch(error => {
            console.log(error);
        })
}, [])


    // console.log(jobs);


    return (

            <ul> 
                {interviews.length > 0 
                ?
                jobs.map(x => <InterviewCard key={x._id} interview={x}/>)
                :
                <p>No interviews in database</p>
                }
            </ul>

        );
}

export default Interviews;