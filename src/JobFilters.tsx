import './styles/LandingPage.css';

const inputStyle = {
  background: 'rgba(20,40,60,0.5)',
  border: '1.5px solid #0ff1ce',
  borderRadius: '1.5rem',
  color: '#fff',
  fontSize: '1.1rem',
  padding: '0.7rem 1.2rem',
  outline: 'none',
  boxShadow: '0 0 12px #0ff1ce44',
  minWidth: '180px',
  transition: 'box-shadow 0.2s',
};

export default function JobFilters() {
  return (
    <form className="job-filters landing-glass" style={{marginTop: 0, marginBottom: '2rem', boxShadow: '0 0 40px #0ff1ce88'}}>
      <h2 className="landing-title" style={{fontSize: '1.5rem', marginBottom: '1.5rem', textShadow: '0 0 24px #0ff1ce, 0 0 48px #0ff1ce88'}}>🔎 Filtry ofert pracy</h2>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center'}}>
        <input className="filter-input" type="text" placeholder="Stanowisko / słowo kluczowe" style={inputStyle} />
        <input className="filter-input" type="text" placeholder="Lokalizacja" style={inputStyle} />
        <select className="filter-input" style={inputStyle}>
          <option value="">Branża</option>
          <option>IT</option>
          <option>Finanse</option>
          <option>Sprzedaż</option>
          <option>Marketing</option>
          <option>Produkcja</option>
          <option>Inne</option>
        </select>
        <select className="filter-input" style={inputStyle}>
          <option value="">Typ umowy</option>
          <option>Umowa o pracę</option>
          <option>B2B</option>
          <option>Umowa zlecenie</option>
          <option>Umowa o dzieło</option>
          <option>Praktyki / Staż</option>
        </select>
        <select className="filter-input" style={inputStyle}>
          <option value="">Tryb pracy</option>
          <option>Zdalna</option>
          <option>Stacjonarna</option>
          <option>Hybrydowa</option>
        </select>
        <input className="filter-input" type="number" min="0" placeholder="Min. wynagrodzenie (PLN)" style={inputStyle} />
      </div>
      <button className="landing-btn" type="submit" style={{marginTop: '2.5rem', fontSize: '1.3rem', boxShadow: '0 0 32px #0ff1cecc'}}>🚀 Szukaj ofert</button>
    </form>
  );
}
