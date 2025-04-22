import {render, screen} from '@testing-library/react';
import Button from './Button';
import { BookStoreThemeProvider } from '../../context/themeContext';


describe("Button component test", () => {
    it("렌더 확인", () => {
        //1 render
        render(
            <BookStoreThemeProvider>
            <Button size='large' scheme='primary'>Button</Button>
            </BookStoreThemeProvider>
        );

        //2 확인
        expect(screen.getByText("Button")).toBeInTheDocument();
    });

    it("size props 적용", () => {
        const {container} = render(
            <BookStoreThemeProvider>
            <Button size='large' scheme='primary'>Button</Button>
            </BookStoreThemeProvider>
        );

        expect(screen.getByRole("button")).toHaveStyle({fontSize: "1.5rem"});
    })

});