
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LandingPage from './LandingPage';
import CVCreator from './CVCreator';
import CVPreview from './CVPreview.tsx';
import RecruiterPanel from './RecruiterPanel';
import Payment from './Payment';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('currentUser');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const paymentCompleted = localStorage.getItem('paymentCompleted');

  if (!user || isLoggedIn !== 'true') {
    return <Navigate to="/" replace />;
  }

  if (paymentCompleted !== 'true') {
    return <Navigate to="/payment" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cv-creator" element={<CVCreator />} />
          <Route path="/cv-preview" element={<CVPreview />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/recruiter-panel" element={
            <ProtectedRoute>
              <RecruiterPanel />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
