import request from 'superagent';

const URL = 'https://polar-fortress-99702.herokuapp.com/';

export function fetchBirds() {
    return request.get(`${URL}/birds`);
}

export function fetchBird(id) {
    return request.get(`${URL}/birds/${id}`);
}