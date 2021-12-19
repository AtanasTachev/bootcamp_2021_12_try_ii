import { createContext, useContext, useState, useCallback } from "react";

export const CandidatesContext = createContext();

export const useCandidatesContext = () => {
    const state = useContext(CandidatesContext);
    return state;
}

export const CandidateProvider = ({
    children
}) => {
    const [candidates, setCandidates] = useState({});

    const addCandidates = useCallback((candidates) => {
        setCandidates({candidates});

    }, []);
    

    return (
        <CandidatesContext.Provider value={{candidates, addCandidates}} >
            { children }
        </CandidatesContext.Provider>
    )
};