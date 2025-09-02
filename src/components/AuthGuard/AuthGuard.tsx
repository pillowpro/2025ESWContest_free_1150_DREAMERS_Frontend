import { type ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUtils } from '../../services';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!apiUtils.isLoggedIn()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  if (!apiUtils.isLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;