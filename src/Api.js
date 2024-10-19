import axios from "axios";
const api = axios.create({
    baseURL: 'https://api.genius.com',
    headers: {
        Authorization: 'Bearer egD1zBFB7ZG1m3hkYXYK9MGGl_ZqPTBRTT7BH5MGZm4gSJ3Q82yLPLv4jZsIP6IS'
    }
});

export default api