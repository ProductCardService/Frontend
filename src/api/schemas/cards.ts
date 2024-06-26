interface Card {
    id: number;
    title: string;
    description: string;
    tags: Array<string>;
}

interface CardImage {
    image: string;
}

type CardList = Array<Card>;

interface CreateUpdateCard {
    title: string;
    description: string;
    tags: Array<string>;
    image: string;
}

interface FullCard {
    id: number;
    title: string;
    description: string;
    tags: Array<string>;
    image: string;
}

export type {Card, CardImage, CardList, CreateUpdateCard, FullCard};