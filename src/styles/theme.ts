// Color theme based on the provided color palette
export const theme = {
  colors: {
    // Blue scale (200-500 only as requested)
    blue: {
      200: "#C5E0F2", // 연한 파란색
      300: "#91C6E8", // 중간 연한 파란색
      400: "#56A8DA", // 중간 파란색
      500: "#3694CE", // 기본 파란색 🔒
    },
    
    // Gray scale (200-500 only)
    gray: {
      200: "#D1D1D1", // 연한 회색
      300: "#B0B0B0", // 중간 연한 회색
      400: "#888888", // 중간 회색
      500: "#6D6D6D", // 진한 회색
    },
    
    // Fixed colors
    white: "#FFFFFF",
    black: "#000000",
    
    // Status colors
    error: "#C93131",
    warning: "#BE6464",
  },
  
  // Typography
  fonts: {
    primary: "Wanted Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    secondary: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "Pretendard, monospace",
  },
  
  // Font weights
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Spacing
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  
  // Border radius
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "20px",
    round: "100px",
  },
  
  // Shadows
  shadows: {
    sm: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    md: "0px 4px 8px 2px rgba(0, 0, 0, 0.25)",
    lg: "0px -2px 5px 0px rgba(0, 0, 0, 0.15)",
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px",
  },
} as const;

export type Theme = typeof theme;