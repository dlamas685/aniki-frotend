import { PageInfo } from "./page.interface";

export interface CharacterConnection {
    edges: CharacterEdge[];
    pageInfo: PageInfo;
}

export interface CharacterEdge {
    id:          number;
    node:        Character; 
    role:        Role;  
    voiceActors: Staff[];  
}

export interface Character {
    id:   number;
    name: Name;
    image: Image;
}

export interface Staff {
    id:   number;
    name: Name;
    image: Image;
    languageV2: Lenguaje;
}

export enum Lenguaje {
    Japanese = "JAPANESE"
}

export interface Image {
    large:  string;
    medium: string;
}

export interface Name {
    full: string;
}

export enum Role {
    Main = "MAIN",
    Supporting = "SUPPORTING",
}
