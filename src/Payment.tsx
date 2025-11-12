import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Symulacja przetwarzania płatności
    setTimeout(() => {
      // Zapisz informację o płatności
      localStorage.setItem('paymentCompleted', 'true');
      localStorage.setItem('paymentDate', new Date().toISOString());
      localStorage.setItem('selectedPlan', selectedPlan);
      localStorage.setItem('planPrice', selectedPlan === 'yearly' ? '499' : '99');

      setIsProcessing(false);
      navigate('/recruiter-panel');
    }, 2000);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h1>💳 Płatność za Panel Rekrutera</h1>
          
          {/* Wybór planu */}
          <div className="plan-selection">
            <div 
              className={`plan-option ${selectedPlan === 'monthly' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('monthly')}
            >
              <div className="plan-name">Plan Miesięczny</div>
              <div className="plan-price">$99<span>/miesiąc</span></div>
              <div className="plan-savings">Płatność co miesiąc</div>
            </div>
            
            <div 
              className={`plan-option ${selectedPlan === 'yearly' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('yearly')}
            >
              <div className="plan-name">Plan Roczny</div>
              <div className="plan-price">$499<span>/rok</span></div>
              <div className="plan-savings">💰 Oszczędź $589 (58%)</div>
            </div>
          </div>

          <div className="plan-summary">
            <div className="plan-name">Enterprise Plan {selectedPlan === 'yearly' ? '(Roczny)' : '(Miesięczny)'}</div>
            <div className="plan-price">{selectedPlan === 'yearly' ? '$499' : '$99'}<span>{selectedPlan === 'yearly' ? '/rok' : '/miesiąc'}</span></div>
            <div className="plan-features">
              <ul>
                <li>✅ Pełny dostęp do panelu rekrutera</li>
                <li>✅ Nieograniczona liczba ofert pracy</li>
                <li>✅ Zaawansowane narzędzia analityczne</li>
                <li>✅ Priorytetowe wsparcie</li>
                <li>✅ Baza CV kandydatów</li>
                {selectedPlan === 'yearly' && <li>✅ <strong>Dodatkowe korzyści roczne</strong></li>}
              </ul>
            </div>
          </div>
        </div>

        <div className="payment-form">
          <h2>Wybierz metodę płatności</h2>

          <div className="payment-methods">
            <label className={`payment-method ${paymentMethod === 'card' ? 'active' : ''}`}>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="method-icon">💳</span>
              Karta kredytowa/debetowa
            </label>

            <label className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}>
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="method-icon">🅿️</span>
              PayPal
            </label>

            <label className={`payment-method ${paymentMethod === 'bank' ? 'active' : ''}`}>
              <input
                type="radio"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="method-icon">🏦</span>
              Przelew bankowy
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="card-form">
              <div className="form-group">
                <label>Numer karty</label>
                <input
                  type="text"
                  name="number"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={handleInputChange}
                  maxLength={19}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data ważności</label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/RR"
                    value={cardData.expiry}
                    onChange={handleInputChange}
                    maxLength={5}
                  />
                </div>

                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={handleInputChange}
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Imię i nazwisko właściciela karty</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Jan Kowalski"
                  value={cardData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="paypal-notice">
              <p>Zostaniesz przekierowany do PayPal w bezpieczny sposób.</p>
            </div>
          )}

          {paymentMethod === 'bank' && (
            <div className="bank-notice">
              <p>Dane do przelewu:</p>
              <div className="bank-details">
                <p><strong>Numer konta:</strong> PL 12 3456 7890 1234 5678 9012 3456</p>
                <p><strong>Odbiorca:</strong> ECV Job Sp. z o.o.</p>
                <p><strong>Tytuł:</strong> Enterprise Plan - {localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).email : ''}</p>
                <p><strong>Kwota:</strong> 99 USD</p>
              </div>
              <p className="bank-warning">⚠️ Płatność zostanie aktywowana po zaksięgowaniu środków (1-3 dni robocze)</p>
            </div>
          )}

          <div className="payment-actions">
            <button
              className="payment-btn"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Przetwarzanie...
                </>
              ) : (
                `Zapłać $${selectedPlan === 'yearly' ? '499' : '99'}`
              )}
            </button>

            <button
              className="cancel-btn"
              onClick={() => navigate('/')}
            >
              Anuluj
            </button>
          </div>
        </div>

        <div className="payment-footer">
          <p>🔒 Płatność jest bezpieczna i szyfrowana</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;