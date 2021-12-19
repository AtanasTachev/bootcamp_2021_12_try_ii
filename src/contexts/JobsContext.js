import { createContext, useContext, useState, useCallback } from "react";

export const JobsContext = createContext();

export const useJobsContext = () => {
    const state = useContext(JobsContext);
    return state;
}

export const JobsProvider = ({
    children
}) => {
    const [jobs, setJobs] = useState({});

    const addJobs = useCallback((jobs) => {
        setJobs({jobs});

    }, []);
    

    return (
        <JobsContext.Provider value={{jobs, addJobs}} >
            { children }
        </JobsContext.Provider>
    )
};