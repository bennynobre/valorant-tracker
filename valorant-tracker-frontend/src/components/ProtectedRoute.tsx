import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const hasAcceptedTerms = localStorage.getItem('termsAccepted') === 'true';

  if (!hasAcceptedTerms) {
    return <Navigate to="/terms" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;