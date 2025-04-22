import {render, screen} from '@testing-library/react';
import Title from './Title';
import { BookStoreThemeProvider } from '../../context/themeContext';

describe("Title component test", () => {
    it("렌더 확인", () => {
        //1 render
        render(
            <BookStoreThemeProvider>
            <Title size="large">Title</Title>
            </BookStoreThemeProvider>
        );

        //2 확인
        expect(screen.getByText("Title")).toBeInTheDocument();
    });

    it('size props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
            <Title size="large">Title</Title>
            </BookStoreThemeProvider>
        );
        expect(container?.firstChild).toHaveStyle({fontSize: "2rem"})
    });

    it('color props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
            <Title size="large" color="primary">Title</Title>
            </BookStoreThemeProvider>
        );
        expect(container?.firstChild).toHaveStyle({color: "brown"})
    });
     
    

    
 });