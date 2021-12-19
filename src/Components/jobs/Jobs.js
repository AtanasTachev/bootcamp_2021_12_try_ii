import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useJobsContext } from '../../contexts/JobsContext';

import * as jobService from '../../services/jobService'
import JobCard from './JobCard'

const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const { addJobs } = useJobsContext();

    useEffect(() => {
        jobService.getAll()
        .then(jobResult => {
            setJobs(jobResult);
            addJobs(jobResult);
            })
            .catch(error => {
                console.log(error);
            })
    }, [addJobs])
    return (

            <ul> 
                {jobs.length > 0 
                ?
                jobs.map(x => <JobCard key={x._id} job={x}/>)
                :
                <p>No jobs in database</p>
                }
            </ul>

        );
}

export default Jobs;