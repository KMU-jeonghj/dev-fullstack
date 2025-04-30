

import { Book } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
import { httpClient } from "./http";

interface FetchBooksParams {
    category_id?: number;
    news?: boolean;
    currentPage?: number;
    limit: number;
}


interface FetchBookResponse {
    books: Book[];
    pagination: Pagination;
}

export  const fetchBooks = async (params: FetchBooksParams) => {
    

    try {
        const response = await httpClient.get<FetchBookResponse>("/books", {params: params});

        return response.data;

    } catch (error) {
        return {
            books: [],
            pagination: {
                totalCount: 0,
                currentPage: 1,
            }
        }
    }
}