import { useEffect, useState } from 'react';
import { useCandidatesContext } from '../../contexts/CandidatesContext';

import * as candidateService from '../../services/candidateService'
import CandidateCard from './CandidateCard'

const Candidates = () => {

    const [candidates, setcandidates] = useState([]);
    const { addCandidates } = useCandidatesContext();

    useEffect(() => {
        candidateService.getAll()
        .then(candidateResult => {
            setcandidates(candidateResult);
            addCandidates(candidateResult);
            })
            .catch(error => {
                console.log(error);
            })
    }, [addCandidates])
    return (

            <ul> 
                {candidates.length > 0 
                ?
                candidates.map(x => <CandidateCard key={x._id} candidate={x}/>)
                :
                <p>No candidates in database</p>
                }
            </ul>

        );
}

export default Candidates;