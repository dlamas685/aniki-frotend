import { MediaCountryOfOrigin, MediaFormat, MediaStatus, MediaType, MediaSource } from "./media.enum";
import { FuzzyDateInt, Studio } from "./media.interface";

export interface DataMedia { 
    title?: string;
    value?: string | string [] | FuzzyDateInt | MediaFormat | MediaStatus | MediaCountryOfOrigin | MediaType;
}


