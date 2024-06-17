import {cardAxios} from "../axios.ts";
import {CreateUpdateCard, Card, CardList, FullCard, CardImage} from '../schemas/cards.ts';
import axios, {AxiosError} from "axios";

const CARDS_URL = "/cards";
const CARD_WITH_ID_URL = "/cards/";
const IMAGE_FOR_CARD_URL = (card_id: number) => `/cards/${card_id}/image`;

const createCard = async (card: CreateUpdateCard): Promise<Card> => {
    try{
        const response = await cardAxios.post(
            CARDS_URL,
            card
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

const getCards = async (): Promise<CardList> => {
    try{
        const response = await cardAxios.get(
            CARDS_URL
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

const getCardById = async (cardId: number): Promise<FullCard> => {
    try{
        const response = await cardAxios.get(
            CARD_WITH_ID_URL + cardId.toString()
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

const updateCardById = async (cardId: number, card: CreateUpdateCard): Promise<Card> => {
    try{
        const response = await cardAxios.put(
            CARD_WITH_ID_URL + cardId.toString(),
            card
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

const deleteCardById = async (cardId: number): Promise<void> => {
    try{
        await cardAxios.delete(
            CARD_WITH_ID_URL + cardId.toString()
        );
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

const getCardImageById = async (cardId: number): Promise<CardImage> => {
    try{
        const response = await cardAxios.get(
            IMAGE_FOR_CARD_URL(cardId)
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


export {createCard, getCards, getCardById, updateCardById, deleteCardById, getCardImageById};
