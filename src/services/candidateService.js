import {baseUrl} from '../constants';


export const getAll = async () => {
    let response = await fetch(`${baseUrl}/candidates`, {
        headers: {
            'content-type': 'application/json'
        }
    })
    let jobs = await response.json();
    return jobs;
};

export const getOne = async (candidateId) => {

    try{
        let response = await fetch(`${baseUrl}/candidates/${candidateId}`);
        let candidate = await response.json();
        return candidate;
    } catch (error) {
        return { message: error.message };
    }
};

export const create = async ({firstName, lastName, email}) => {

    let response = await fetch(`${baseUrl}/candidates`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName, email})
    });
    let result = await response.json();
    return result;
};

export const edit = async (candidateId, firstName, lastName, email) => {

    let response = await fetch(`${baseUrl}/candidates/${candidateId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName, email})
    });
    let result = await response.json();
    return result;
};

export const deleteCandidate = (candidateId) => {
    return fetch(`${baseUrl}/candidates/${candidateId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    }).then(res => res.json());
}