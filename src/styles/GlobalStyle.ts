import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    overflow-x: hidden;
  } 

  body {
    font-family: ${theme.fonts.primary};
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.black};
    background-color: ${theme.colors.white};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0 auto;
    max-width: 412px; /* Mobile-first, iPhone 14 Pro Max width */
    position: relative;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    -webkit-tap-highlight-color: transparent;
  }

  input, textarea {
    font-family: inherit;
    outline: none;
    border: none;
    -webkit-appearance: none;
  }

  a {
    text-decoration: none;
    color: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }

  /* Hide scrollbar but keep functionality */
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  /* Touch optimization for mobile */
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Allow text selection for specific elements */
  input, textarea, p, span {
    -webkit-user-select: auto;
    -khtml-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }

  /* Responsive base font size */
  html {
    font-size: 16px;
    
    @media (max-width: ${theme.breakpoints.tablet}) {
      font-size: 15px;
    }
    
    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: 14px;
    }
  }

  /* Safe area handling for modern mobile devices */
  @supports (padding: max(0px)) {
    body {
      padding-left: max(0px, env(safe-area-inset-left));
      padding-right: max(0px, env(safe-area-inset-right));
    }
  }
`;