import {cardAxios} from "../axios.ts";
import {CreateUpdateCard, Card, CardList, FullCard, CardImage} from '../schemas/cards.ts';
import {AxiosError} from "axios";
import {mockCards, mockImages} from "../../mockData.ts";

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
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return {
                id: 1,
                title: card.title,
                description: card.description,
                tags: card.tags
            }
        }
        console.log(error);
        throw Error("Возникла ошибка при выполнении запроса");
    }
}

const getCards = async (): Promise<CardList> => {
    try{
        const response = await cardAxios.get(
            CARDS_URL
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return [
                mockCards[0],
                mockCards[3]
            ]
        }
        console.log(error);
        throw Error("Возникла ошибка при выполнении запроса");
    }
}

const getCardById = async (cardId: number): Promise<FullCard> => {
    try{
        const response = await cardAxios.get(
            CARD_WITH_ID_URL + cardId.toString()
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return mockCards[cardId]
        }
        console.log(error);
        throw Error("Возникла ошибка при выполнении запроса");
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
        if ((error as AxiosError).code === "ERR_NETWORK"){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return {...mockCards[cardId]}
        }
        console.log(error);
        throw Error("Возникла ошибка при выполнении запроса");
    }
}

const deleteCardById = async (cardId: number): Promise<void> => {
    try{
        await cardAxios.delete(
            CARD_WITH_ID_URL + cardId.toString()
        );
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return;
        }
        console.log(error);
        throw Error("Возникла ошибка при выполнении запроса");
    }
}

const getCardImageById = async (cardId: number): Promise<CardImage> => {
    try{
        const response = await cardAxios.get(
            IMAGE_FOR_CARD_URL(cardId)
        );
        return response.data;
    } catch (error) {
        if ((error as AxiosError).code === "ERR_NETWORK"){
            return {
                image: mockImages[cardId]
            }
        }
        console.log(error);
        throw Error("Возникла ошибка при выполнении запроса");
    }
}


export {createCard, getCards, getCardById, updateCardById, deleteCardById, getCardImageById};
