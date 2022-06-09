import { MediaFormat, MediaSort, MediaType } from "./media.enum";


export interface MultiSelectMedia {
    name: string;
    code: string | number;
}

export interface SelectMedia {
    name: string;
    code: string;
}

export interface Filter {
    search?: string | null;
    genres?: string [] | null;
    tags?: string [] | null;
    year?: number | null;
    format?: MediaFormat | null;
    type: MediaType;
    sort: MediaSort[];
}

