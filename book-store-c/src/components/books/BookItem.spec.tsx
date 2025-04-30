import React from 'react';
import { render, screen } from '@testing-library/react';
import BookItem from './BookItem';
import { BookStoreThemeProvider } from '../../context/themeContext';
import { Book } from '../../models/book.model';

const dummyBook: Book = {
    id: 1,
    title: "Dummy Book Title",
    img: 5,
    category_id: 1, 
    form: "Dummy Form",
    isbn: "1234567890",
    summary: "Dummy Summary",
    detail: "Dummy Detail",
    author: "Dummy Author",
    pages: 100,
    contents: "Dummy Contents",
    price: 10000,
    likes: 10,
    pubDate: "2023-01-01"
    // Add other properties as needed
}

describe('BookItem TEST', () => {
    it("redered well", () => {
        const { getByText, getByAltText } = render(
            <BookStoreThemeProvider>
                <BookItem book={dummyBook} />
            </BookStoreThemeProvider>
        );

        expect(getByText(dummyBook.title)).toBeInTheDocument();

        expect(getByText(dummyBook.summary)).toBeInTheDocument();

        expect(getByText(dummyBook.author)).toBeInTheDocument();

        expect(getByText("10,000원")).toBeInTheDocument();

        expect(getByAltText(dummyBook.title)).toHaveAttribute(
            "src",
            `https://picsum.photos/id/${dummyBook.img}/600/600`)
        
    });
})

