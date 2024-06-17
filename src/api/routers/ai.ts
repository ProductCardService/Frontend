import {aiAxios} from "../axios.ts";
import {GeneratedDescriptions, Prompt, GeneratedImages, GeneratedTags} from '../schemas/ai.ts';
import axios, {AxiosError} from "axios";

const GENERATE_DESCRIPTIONS_URL = "/generate/descriptions";
const GENERATE_IMAGES_URL = "/generate/images";
const GENERATE_TAGS_URL = "/generate/tags";


interface Error {
    message: string
}

const generateDescriptions = async (prompt: Prompt): Promise<GeneratedDescriptions> => {
    try{
        const response = await aiAxios.post(
            GENERATE_DESCRIPTIONS_URL,
            prompt
        );
        return response.data;
    } catch (error) {
        console.error(error);
        const e = error as AxiosError;
        if (axios.isAxiosError(error)) {
            if (e.response) {
                const errorData = e.response.data as Error
                throw Error(errorData.message);
            } else if (e.request) {
                throw Error("Ответ от сервера не пришел");
            }
            throw Error("При создании запроса возникла ошибка");
        } else {
            throw Error("Возникла непредвиденная ошибка");
        }
    }
}

const generateImages = async (prompt: Prompt): Promise<GeneratedImages> => {
    try{
        const response = await aiAxios.post(
            GENERATE_IMAGES_URL,
            prompt
        );
        return response.data;
    } catch (error) {
        console.error(error);
        const e = error as AxiosError;
        if (axios.isAxiosError(error)) {
            if (e.response) {
                const errorData = e.response.data as Error
                throw Error(errorData.message);
            } else if (e.request) {
                throw Error("Ответ от сервера не пришел");
            }
            throw Error("При создании запроса возникла ошибка");
        } else {
            throw Error("Возникла непредвиденная ошибка");
        }
    }
}

const generateTags = async (prompt: Prompt): Promise<GeneratedTags> => {
    try{
        const response = await aiAxios.post(
            GENERATE_TAGS_URL,
            prompt
        );
        return response.data;
    } catch (error) {
        console.error(error);
        const e = error as AxiosError;
        if (axios.isAxiosError(error)) {
            if (e.response) {
                const errorData = e.response.data as Error
                throw Error(errorData.message);
            } else if (e.request) {
                throw Error("Ответ от сервера не пришел");
            }
            throw Error("При создании запроса возникла ошибка");
        } else {
            throw Error("Возникла непредвиденная ошибка");
        }
    }
}

export {generateDescriptions, generateImages, generateTags};
