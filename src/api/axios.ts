import axios from "axios";

const card_axios = axios.create({
    baseURL: "http://localhost:8088"
});

const ai_axios = axios.create({
    baseURL: "http://localhost:8088"
});

export {card_axios, ai_axios};