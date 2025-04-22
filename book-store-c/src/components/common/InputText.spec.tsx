import {render, screen} from '@testing-library/react';
import InputText from './InputText';
import { BookStoreThemeProvider } from '../../context/themeContext';
import { createRef } from 'react';


describe("InputText component test", () => {
    it("렌더 확인", () => {
        //1 render
        render(
            <BookStoreThemeProvider>
            <InputText placeholder='input here'/>
            </BookStoreThemeProvider>
        );

        //2 확인
        expect(screen.getByPlaceholderText("input here")).toBeInTheDocument();
    });

    it('forwardRef test', () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <BookStoreThemeProvider>
            <InputText placeholder='input here' ref={ref} />
            </BookStoreThemeProvider>
        );

        expect(ref.current).toBeInstanceOf(HTMLInputElement)
    });

    

});