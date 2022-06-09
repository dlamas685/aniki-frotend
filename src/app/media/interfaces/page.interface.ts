import { Media } from "./media.interface";

export interface Page {
    pageInfo: PageInfo;
    media:    Media[];
}

export interface PageInfo {
    total:       number;
    currentPage: number;
    lastPage:    number;
    hasNextPage: boolean;
    perPage:     number;
}

export interface PaginatorElement {
    page: number;
    rows: number;
    pageCount: number;
    first: number;
}