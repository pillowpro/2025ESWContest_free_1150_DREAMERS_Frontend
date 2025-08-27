import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { HomePage } from './pages/HomePage';
import { MonthlyReportPage } from './pages/MonthlyReportPage';
import { MyPage } from './pages/MyPage';

type Page = 'home' | 'report' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleTabChange = (tab: Page) => {
    setCurrentPage(tab);
  };

  const handleBack = () => {
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onTabChange={handleTabChange} />;
      case 'report':
        return <MonthlyReportPage onBack={handleBack} />;
      case 'profile':
        return <MyPage onTabChange={handleTabChange} />;
      default:
        return <HomePage onTabChange={handleTabChange} />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {renderCurrentPage()}
    </ThemeProvider>
  );
}

export default App
