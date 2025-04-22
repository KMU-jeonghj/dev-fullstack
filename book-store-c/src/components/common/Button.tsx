import React, { ReactNode } from 'react'
import styled from 'styled-components';
import { ButtonScheme, ButtonSize } from '../../style/theme';

interface Props {
    children: ReactNode;
    size: ButtonSize;
    scheme: ButtonScheme;
    disabled?: boolean;
    isloading?: boolean;
}

const Button = ({children, size, scheme, disabled, isloading}: Props) => {
  return (
    <ButtonStyle size={size} scheme={scheme} 
    disabled={disabled} isloading={isloading}>
      {children}
    </ButtonStyle>
  )
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
  font-size: ${({theme, size}) => theme.button[size].fontSize};
  padding: ${({theme, size}) => theme.button[size].padding};
  color: ${({theme, scheme: schema}) => theme.buttonScheme[schema].color};
  background-color: ${({theme, scheme: schema}) => theme.buttonScheme[schema].backgroundColor};
  border: 0;
  border-radius: #{({theme}) => theme.borderRadius.default};
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  pointer-events: ${({disabled}) => (disabled ? "none" : "auto")};
  cursor: ${({disabled}) => (disabled ? "none" : "pointer")};
`;

export default Button
