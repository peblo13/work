import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

interface AuthProps {
  onLogin: (user: any) => void;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    name: '',
    plan: 'Enterprise'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login logic
      if (formData.email === 'test@ecvjob.pl' && formData.password === 'test123') {
        const user = {
          name: 'Test Recruiter',
          email: 'test@ecvjob.pl',
          plan: 'Enterprise',
          planIcon: '🏛️',
          userId: 'test-recruiter',
          company: 'Test Company',
          role: 'recruiter'
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        onLogin(user);
        onClose();
        
        // Sprawdź czy użytkownik już zapłacił
        const paymentCompleted = localStorage.getItem('paymentCompleted');
        if (paymentCompleted === 'true') {
          navigate('/recruiter-panel');
        } else {
          navigate('/payment');
        }
      } else {
        setError('Nieprawidłowy email lub hasło');
      }
    } else {
      // Registration logic
      if (formData.password !== formData.confirmPassword) {
        setError('Hasła nie są identyczne');
        return;
      }
      if (formData.password.length < 6) {
        setError('Hasło musi mieć co najmniej 6 znaków');
        return;
      }

      // Create new user
      const user = {
        name: formData.name,
        email: formData.email,
        plan: formData.plan === 'Enterprise-Annual' ? 'Enterprise (Roczny)' : 'Enterprise',
        planIcon: '🏛️',
        userId: Date.now().toString(),
        company: formData.company,
        role: 'recruiter'
      };

      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      onLogin(user);
      onClose();
      
      // Sprawdź czy użytkownik już zapłacił (choć dla nowych użytkowników to rzadkość)
      const paymentCompleted = localStorage.getItem('paymentCompleted');
      if (paymentCompleted === 'true') {
        navigate('/recruiter-panel');
      } else {
        navigate('/payment');
      }
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="auth-header">
          <h2>{isLogin ? 'Logowanie' : 'Rejestracja'}</h2>
          <p>{isLogin ? 'Zaloguj się do panelu rekrutera' : 'Utwórz konto rekrutera'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="name">Imię i nazwisko</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Nazwa firmy</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="plan">Plan</label>
                <div className="plan-info" style={{marginBottom: '1.2rem'}}>
                  <div className="plan-price" style={{marginBottom: '0.7rem'}}>
                    <label style={{display:'flex',alignItems:'center',gap:'0.5em',cursor:'pointer'}}>
                      <input
                        type="radio"
                        id="plan-monthly"
                        name="plan"
                        value="Enterprise"
                        checked={formData.plan === 'Enterprise'}
                        onChange={handleInputChange}
                        style={{marginRight:'0.5em'}}
                      />
                      <span className="plan-name">Enterprise (🏛️)</span>
                      <span className="price">$99/miesiąc</span>
                    </label>
                  </div>
                  <div className="plan-price">
                    <label style={{display:'flex',alignItems:'center',gap:'0.5em',cursor:'pointer'}}>
                      <input
                        type="radio"
                        id="plan-annual"
                        name="plan"
                        value="Enterprise-Annual"
                        checked={formData.plan === 'Enterprise-Annual'}
                        onChange={handleInputChange}
                        style={{marginRight:'0.5em'}}
                      />
                      <span className="plan-name">Enterprise (🏛️)</span>
                      <span className="price">$499/rok</span>
                    </label>
                  </div>
                  <p className="plan-description">
                    Pełny dostęp do wszystkich funkcji rekrutacyjnych, nieograniczona liczba ofert pracy, zaawansowane narzędzia analityczne i priorytetowe wsparcie.
                  </p>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Potwierdź hasło</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-btn">
            {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>Nie masz konta? <button onClick={() => setIsLogin(false)}>Zarejestruj się</button></p>
          ) : (
            <p>Masz już konto? <button onClick={() => setIsLogin(true)}>Zaloguj się</button></p>
          )}

          {/* Usunięto adnotację Konto demo */}
        </div>
      </div>
    </div>
  );
};

export default Auth;