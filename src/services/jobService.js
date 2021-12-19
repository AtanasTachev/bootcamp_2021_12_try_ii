import {baseUrl} from '../constants';


export const getAll = async () => {
    let response = await fetch(`${baseUrl}/jobs`, {
        headers: {
            'content-type': 'application/json'
        }
    })
    let jobs = await response.json();
    return jobs;
};

export const getOne = async (jobId) => {

    try{
        let response = await fetch(`${baseUrl}/jobs/${jobId}`);
        let job = await response.json();
        return job;
    } catch (error) {
        return { message: error.message };
    }
};

export const create = async ({title, description}) => {

    let response = await fetch(`${baseUrl}/jobs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({title, description})
    });
    let result = await response.json();
    return result;
};

export const edit = async (jobId, title, description) => {

    let response = await fetch(`${baseUrl}/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({title, description})
    });
    let result = await response.json();
    return result;
};

export const deleteJob = (jobId) => {
    return fetch(`${baseUrl}/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    }).then(res => res.json());
}