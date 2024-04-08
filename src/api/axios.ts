import axios from "axios";
const MODE = import.meta.env.VITE_MODE;

let cardBaseURL = undefined;
let aiBaseURL = undefined;
if (MODE !== "production"){
    cardBaseURL = import.meta.env.VITE_CARDS_API_HOST || "";
    aiBaseURL = import.meta.env.VITE_AI_GENERATOR_API_HOST || "";
}
const cardAxios = axios.create({
    baseURL: cardBaseURL
});

const aiAxios = axios.create({
    baseURL: aiBaseURL
});

export {cardAxios, aiAxios};