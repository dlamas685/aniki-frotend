import { Character, CharacterConnection } from "./character.interface";
import { MediaCountryOfOrigin, MediaFormat, MediaStatus, MediaType } from "./media.enum";
import { Page } from "./page.interface";

export interface DataResponseForMedia {
    data: Data;
}

export interface Data {
    Page: Page;
    Media: Media;
    GenreCollection: string [];
    MediaTagCollection: Tag [];
}

export interface Media {
    id:              number;
    title:           Title;
    description:     null | string;
    source:          MediaSource | null;
    season:          null | string;
    genres:          string[];
    seasonYear:      number | null;
    episodes:        number | null;
    duration:        number | null;
    startDate:       FuzzyDateInt;
    endDate:         FuzzyDateInt;
    bannerImage:     null | string;
    coverImage:      CoverImage;
    countryOfOrigin: MediaCountryOfOrigin;
    format:          MediaFormat;
    tags:            Tag[];
    status:          MediaStatus;
    popularity:      number;
    isAdult:         boolean;
    isFavorite:      boolean;
    type:            MediaType;
    trailer:         Trailer | null;
    averageScore:    number | null;
    meanScore:       number | null;
    favourites:      number | null;
    studios:         Studio;
    characters:      CharacterConnection;
    relations: MediaConnection;
    recommendations: RecommendationConnection;
}

export interface RecommendationConnection {
    nodes: Recommendation [];
}

export interface Recommendation {
    id:number;
    mediaRecommendation: Media
}

export interface MediaConnection {
    edges: MediaEdge[];
}

export interface MediaEdge {
    id: number;
    node: Media;
}

export interface Studio {
    nodes: Node[];
}

export interface Node {
    id:   number;
    name: string;
    isAnimationStudio: boolean;
}

export interface FuzzyDateInt{
    day:   number | null;
    month: number | null;
    year:  number | null;
}

export interface CoverImage {
    extraLarge: string;
    large:      string;
    medium:     string;
    color:      null | string;
}

export interface Tag {
    id:   number;
    name: string;
}

export interface Title {
    romaji:        string;
    userPreferred: string;
    english:       null | string;
    native:        string;
}

export interface Trailer {
    id: string;
}



