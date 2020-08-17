import request from 'superagent';

const URL = 'http://localhost:3001';
//process.env.REACT_APP_API_URL;

export function fetchBirds() {
    try {
        return request.get(`${URL}/birds`);
    } catch (e) {
        return { error: e.message }
    }
}

export function fetchRescues() {
    try {
        return request.get(`${URL}/rescues`);
    } catch (e) {
        return { error: e.message }
    }
}

export function fetchBird(id) {
    return request.get(`${URL}/birds/${id}`);
}

export function deleteBird(id) {
    return request.delete(`${URL}/birds/${id}`);
}

export function updateBird(id, updatedBird) {
    return request.put(`${URL}/birds/${id}`, updatedBird);
}

export function createBird(birdData) {
    return request.post(`${URL}/birds`, birdData);
}