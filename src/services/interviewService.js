import {baseUrl} from '../constants';


export const getAll = async () => {
    let response = await fetch(`${baseUrl}/interviews`, {
        headers: {
            'content-type': 'application/json'
        }
    })
    let interviews = await response.json();
    return interviews;
};

export const getOne = async (interviewId) => {

    try{
        let response = await fetch(`${baseUrl}/interviews/${interviewId}`);
        let interview = await response.json();
        return interview;
    } catch (error) {
        return { message: error.message };
    }
};

export const create = async ({jobId, candidateId, slot}) => {

    let response = await fetch(`${baseUrl}/interviews`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({jobId, candidateId, slot})
    });
    let result = await response.json();
    return result;
};

export const edit = async (interviewId, title, description) => {

    let response = await fetch(`${baseUrl}/interviews/${interviewId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({title, description})
    });
    let result = await response.json();
    return result;
};

export const deleteInterview = (interviewId) => {
    return fetch(`${baseUrl}/interviews/${interviewId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    }).then(res => res.json());
}