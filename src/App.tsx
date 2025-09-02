import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { theme } from "./styles/theme";
import { HomePage } from "./pages/HomePage";
import { MonthlyReportPage } from "./pages/MonthlyReportPage";
import { MyPage } from "./pages/MyPage";
import SleepDetailPage from "./pages/SleepDetailPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import PillowSettingsPage from "./pages/PillowSettingsPage";
import AuthGuard from "./components/AuthGuard";
import {
  Login,
  Signup,
  Agreement,
  DeviceRegister,
  DeviceConnecting,
  DeviceSearching,
  DeviceLocation,
  WifiSetup,
} from "./pages/Auth";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<AuthGuard><HomePage /></AuthGuard>} />
        <Route path="/report" element={<AuthGuard><MonthlyReportPage /></AuthGuard>} />
        <Route path="/profile" element={<AuthGuard><MyPage /></AuthGuard>} />
        <Route path="/profile/edit" element={<AuthGuard><ProfileEditPage /></AuthGuard>} />
        <Route path="/pillow/settings" element={<AuthGuard><PillowSettingsPage /></AuthGuard>} />
        <Route path="/sleep-detail/:date?" element={<AuthGuard><SleepDetailPage /></AuthGuard>} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/agreement" element={<Agreement />} />
        <Route path="/device-register" element={<DeviceRegister />} />
        <Route path="/device-searching" element={<DeviceSearching />} />
        <Route path="/wifi-setup" element={<WifiSetup />} />
        <Route path="/device-connecting" element={<DeviceConnecting />} />
        <Route path="/device-location" element={<DeviceLocation />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
