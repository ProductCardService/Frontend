import {ai_axios} from "../axios.ts";
import {GeneratedDescriptions, Prompt, GeneratedImages, GeneratedTags} from '../schemas/ai.ts';
import {AxiosError} from "axios";
import {mockDescriptions, mockImages, mockTags} from "../../mockData.ts";

const GENERATE_DESCRIPTIONS_URL = "/generate/descriptions";
const GENERATE_IMAGES_URL = "/generate/images";
const GENERATE_TAGS_URL = "/generate/tags";

const generateDescriptions = async (prompt: Prompt): Promise<GeneratedDescriptions> => {
    try{
        const response = await ai_axios.post(
            GENERATE_DESCRIPTIONS_URL,
            prompt
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return {
                descriptions: mockDescriptions
            }
        }
        console.log(error);
        throw Error("Ошибка");
    }
}

const generateImages = async (prompt: Prompt): Promise<GeneratedImages> => {
    try{
        const response = await ai_axios.post(
            GENERATE_IMAGES_URL,
            prompt
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return {
                images: mockImages
            }
        }
        console.log(error);
        throw Error("Ошибка");
    }
}

const generateTags = async (prompt: Prompt): Promise<GeneratedTags> => {
    try{
        const response = await ai_axios.post(
            GENERATE_TAGS_URL,
            prompt
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return {
                tags: mockTags
            }
        }
        console.log(error);
        throw Error("Ошибка");
    }
}

export {generateDescriptions, generateImages, generateTags};
