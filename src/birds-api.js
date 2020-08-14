import request from 'superagent';

const URL = process.env.REACT_APP_API_URL;

export function fetchBirds() {
    return request.get(`${URL}/birds`);
}

export function fetchBird(id) {
    return request.get(`${URL}/birds/${id}`);
}

export function createBird(birdData) {
    return request.post(`${URL}/birds`, birdData);
}