import { css } from 'styled-components';
import { theme } from '../styles/theme';

// Mobile-first responsive helpers
export const mobile = (styles: string) => css`
  @media (max-width: ${theme.breakpoints.mobile}) {
    ${styles}
  }
`;

export const tablet = (styles: string) => css`
  @media (max-width: ${theme.breakpoints.tablet}) {
    ${styles}
  }
`;

export const desktop = (styles: string) => css`
  @media (min-width: ${theme.breakpoints.desktop}) {
    ${styles}
  }
`;

// Responsive font size helper
export const responsiveFontSize = (mobile: number, tablet?: number, desktop?: number) => css`
  font-size: ${mobile}px;
  
  ${tablet && css`
    @media (max-width: ${theme.breakpoints.tablet}) {
      font-size: ${tablet}px;
    }
  `}
  
  ${desktop && css`
    @media (min-width: ${theme.breakpoints.desktop}) {
      font-size: ${desktop}px;
    }
  `}
`;

// Responsive spacing helper
export const responsiveSpacing = (mobile: string, tablet?: string, desktop?: string) => css`
  padding: ${mobile};
  
  ${tablet && css`
    @media (max-width: ${theme.breakpoints.tablet}) {
      padding: ${tablet};
    }
  `}
  
  ${desktop && css`
    @media (min-width: ${theme.breakpoints.desktop}) {
      padding: ${desktop};
    }
  `}
`;

// Container with max-width for different screen sizes
export const containerStyles = css`
  width: 100%;
  max-width: 412px; /* iPhone 14 Pro Max width */
  margin: 0 auto;
  position: relative;
`;