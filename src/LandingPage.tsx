
import './styles/LandingPage.css';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import i18n from './i18n';
import LanguageSelector from './components/LanguageSelector';
import Auth from './Auth';
import Ad from './components/Ad';

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
  snippet?: string;
}

const getPositionIcon = (index: number) => {
  if (index === 0) return '🏆';
  if (index === 1) return '🥈';
  if (index === 2) return '🥉';
  return (index + 1).toString();
};

export default function LandingPage() {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobCount, setJobCount] = useState(0);
  const [countryRanking, setCountryRanking] = useState<any[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    console.log('expanded:', expanded);
    console.log('Fetching country ranking...');
    fetch(`/.netlify/functions/country-ranking?expand=${expanded}`)
      .then(res => {
        console.log('Country ranking response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Country ranking data:', data);
        setCountryRanking(data.ranking || []);
        // Ustaw licznik na sumę ofert z ranking krajów
        const totalOffers = (data.ranking || []).reduce((sum: number, item: any) => sum + item.count, 0);
        setJobCount(totalOffers);
      })
      .catch(err => {
        console.error('Error fetching country ranking:', err);
        setCountryRanking([]);
      });
  }, [expanded]);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('currentUser');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (user && isLoggedIn === 'true') {
      setCurrentUser(JSON.parse(user));
    }
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [contractType, setContractType] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [minSalary, setMinSalary] = useState('');

  const normalizePolish = (str: string) => {
    return str
      .replace(/Polska/g, 'Poland')
      .replace(/Niemcy/g, 'Germany')
      .replace(/Francja/g, 'France')
      .replace(/Włochy/g, 'Italy')
      .replace(/Hiszpania/g, 'Spain')
      .replace(/Wielka Brytania/g, 'United Kingdom')
      .replace(/USA/g, 'United States')
      .replace(/Kanada/g, 'Canada')
      .replace(/Australia/g, 'Australia')
      .replace(/ą/g, 'a')
      .replace(/ć/g, 'c')
      .replace(/ę/g, 'e')
      .replace(/ł/g, 'l')
      .replace(/ń/g, 'n')
      .replace(/ó/g, 'o')
      .replace(/ś/g, 's')
      .replace(/ź/g, 'z')
      .replace(/ż/g, 'z')
      .replace(/Ą/g, 'A')
      .replace(/Ć/g, 'C')
      .replace(/Ę/g, 'E')
      .replace(/Ł/g, 'L')
      .replace(/Ń/g, 'N')
      .replace(/Ó/g, 'O')
      .replace(/Ś/g, 'S')
      .replace(/Ź/g, 'Z')
      .replace(/Ż/g, 'Z');
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  const handleSearch = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        keywords: searchQuery,
        location: normalizePolish(location),
        page: page.toString()
      });
      const response = await fetch(`/.netlify/functions/jobs?${params}`);
      const data = await response.json();
      if (page === 1) {
        setJobs(data.jobs || []);
        setCurrentPage(1);
      } else {
        setJobs(prev => [...prev, ...(data.jobs || [])]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    handleSearch(nextPage);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    setCurrentUser(null);
  };

  return (
    <>
      <Helmet>
        <title>WorkPlanet Jobs - Global Job Search Platform | Find Your Dream Job Worldwide</title>
        <meta name="description" content="Search millions of job opportunities worldwide on WorkPlanet Jobs. Find your dream job in any industry, location, or language. Free job search platform with advanced filters." />
        <meta name="keywords" content="jobs, employment, career, work, job search, global jobs, international jobs, job listings, job opportunities, find job" />
        <link rel="canonical" href={`https://workplanetjobs.com/${i18n.language}/`} />
        <meta property="og:url" content={`https://workplanetjobs.com/${i18n.language}/`} />
        <meta property="og:locale" content={i18n.language} />
        <html lang={i18n.language} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `https://workplanetjobs.com/${i18n.language}/`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Job Search",
                "item": `https://workplanetjobs.com/${i18n.language}/#search`
              }
            ]
          })}
        </script>
      </Helmet>
      {showAuth && <Auth onLogin={handleLogin} onClose={() => setShowAuth(false)} />}
      <div className="language-selector">
        <select 
          value={i18n.language} 
          onChange={(e) => changeLanguage(e.target.value)}
          className="lang-select"
        >
          <option value="en">English</option>
          <option value="pl">Polski</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
          <option value="pt">Português</option>
          <option value="zh">中文</option>
          <option value="ja">日本語</option>
          <option value="ar">العربية</option>
        </select>
      </div>
      <div className="auth-buttons">
        {currentUser ? (
          <div className="user-info">
            <span>👋 {currentUser.name}</span>
            <span>{currentUser.planIcon} {currentUser.plan}</span>
            <Link to="/recruiter-panel" className="panel-btn">🏢 Panel Rekrutera</Link>
            <button onClick={handleLogout} className="logout-btn">🚪 Wyloguj</button>
          </div>
        ) : (
          <button onClick={() => setShowAuth(true)} className="login-btn">🔐 Zaloguj się</button>
        )}
      </div>
      <LanguageSelector />
      <div className="landing-glass">
        <h1 className="landing-title">{t("Workplanetjobs.com")}</h1>
        <div className="landing-subtitle">
          {t("Futurystyczny portal pracy: AI, kreator CV, szybka rekrutacja, panel rekrutera, płatności online.")}
        </div>

        {/* Google AdSense Banner */}
        <Ad slot="1234567890" format="horizontal" className="banner-top" />

        <div className="job-counter">
          <span className="counter-number">{jobCount.toLocaleString()}</span>
          <span className="counter-text">{t("aktualnych ofert pracy na świecie")}</span>
        </div>

        {/* Ranking krajów */}
        {countryRanking.length > 0 && (
          <div className="country-ranking">
            <h3>{t("Ranking krajów z największą liczbą ofert pracy")}</h3>
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>{t("Pozycja")}</th>
                  <th>{t("Kraj")}</th>
                  <th>{t("Liczba ofert")}</th>
                </tr>
              </thead>
              <tbody>
                {countryRanking.map((item, index) => (
                  <tr key={item.country}>
                    <td>{getPositionIcon(index)}</td>
                    <td>{item.country}</td>
                    <td>{item.count.toLocaleString()}</td>
                  </tr>
                ))}
                <tr style={{fontWeight: 'bold', backgroundColor: 'rgba(15, 241, 206, 0.2)', color: '#0ff1ce', borderTop: '2px solid #0ff1ce'}}>
                  <td>Razem</td>
                  <td></td>
                  <td>{countryRanking.reduce((sum, item) => sum + item.count, 0).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            {!expanded && (
              <button className="expand-btn" onClick={() => setExpanded(true)}>
                {t('Rozwiń ranking')}
              </button>
            )}
            {expanded && (
              <button className="expand-btn" onClick={() => setExpanded(false)}>
                {t('Zwiń ranking')}
              </button>
            )}
          </div>
        )}
        <div className="search-bar">
          <input
            type="text"
            placeholder={t("Stanowisko / słowo kluczowe")}
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" onClick={() => handleSearch()} disabled={loading}>
            {loading ? t('Szukam...') : `🔍 ${t('Szukaj')}`}
          </button>
          <button className="gear-btn" onClick={() => setShowFilters(!showFilters)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        {showFilters && (
          <div className="additional-filters">
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem'}}>
              <input
                type="text"
                placeholder={t("Lokalizacja")}
                className="filter-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                className="info-btn"
                onClick={() => alert(t('Wpisz miasto, np. Kraków (zostanie zamienione na Krakow) lub Poznan, Polska (na Poznan, Poland). Użyj angielskich nazw krajów dla lepszych wyników.'))}
                title={t("Wpisz miasto, np. Kraków (zostanie zamienione na Krakow) lub Poznan, Polska (na Poznan, Poland). Użyj angielskich nazw krajów dla lepszych wyników.")}
              >
                ℹ️
              </button>
              <select
                className="filter-input"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Branża</option>
                <option>IT</option>
                <option>Finanse</option>
                <option>Sprzedaż</option>
                <option>Marketing</option>
                <option>Produkcja</option>
                <option>Inne</option>
              </select>
              <select
                className="filter-input"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
              >
                <option value="">Typ umowy</option>
                <option>Umowa o pracę</option>
                <option>B2B</option>
                <option>Umowa zlecenie</option>
                <option>Umowa o dzieło</option>
                <option>Praktyki / Staż</option>
              </select>
              <select
                className="filter-input"
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value)}
              >
                <option value="">Tryb pracy</option>
                <option>Zdalna</option>
                <option>Stacjonarna</option>
                <option>Hybrydowa</option>
              </select>
              <input
                type="number"
                min="0"
                placeholder="Min. wynagrodzenie (PLN)"
                className="filter-input"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
              />
            </div>
          </div>
        )}
        {jobs.length > 0 && (
          <div className="job-results">
            <h2>{t("Wyniki wyszukiwania:")}</h2>
            {jobs.map((job, index) => (
              <div key={index} className="job-item">
                <script type="application/ld+json">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "JobPosting",
                    "title": job.title,
                    "description": job.snippet ? stripHtml(job.snippet) : job.title,
                    "hiringOrganization": {
                      "@type": "Organization",
                      "name": job.company
                    },
                    "jobLocation": {
                      "@type": "Place",
                      "address": {
                        "@type": "PostalAddress",
                        "addressLocality": job.location
                      }
                    },
                    "url": job.link,
                    "datePosted": new Date().toISOString().split('T')[0], // Assuming current date, adjust if available
                    "employmentType": "FULL_TIME", // Default, adjust if available
                    "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
                  })}
                </script>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>{job.location}</p>
                {job.snippet && <p className="job-description">{stripHtml(job.snippet)}</p>}
                <a href={job.link} target="_blank" rel="noopener noreferrer">{t("Zobacz ofertę")}</a>
                <Link to="/cv-creator" className="make-cv-btn">{t("Zrób CV")}</Link>
              </div>
            ))}
            <button className="landing-btn" onClick={loadMore} disabled={loading} style={{marginTop: '1rem'}}>
              {loading ? t('Ładowanie...') : t('Załaduj więcej')}
            </button>
            <div className="job-summary" style={{marginTop: '1rem', textAlign: 'center', fontSize: '1.2rem', color: '#0ff1ce'}}>
              Łącznie znaleziono {jobCount.toLocaleString()} ofert pracy
            </div>
          </div>
        )}
        <div className="features-container">
          {/* Google AdSense Banner Bottom */}
          <Ad slot="0987654321" format="horizontal" className="banner-bottom" />

          <h2 style={{marginBottom: '2rem', color: '#0ff1ce'}}>{t("Funkcje")}</h2>
          <div className="feature-card">
            <h3>{t("Kreator CV")}</h3>
            <p>{t("Stwórz profesjonalne CV w kilka minut z pomocą AI")}</p>
            <Link to="/cv-creator" className="feature-btn">{t("Rozpocznij")}</Link>
          </div>
          <div className="feature-card">
            <h3>{t("Panel Rekrutera")}</h3>
            <p>{t("Zarządzaj ofertami pracy i przeglądaj kandydatów")}</p>
            <button onClick={() => setShowAuth(true)} className="feature-btn">{t("Przejdź")}</button>
          </div>
          <div className="feature-card">
            <h3>{t("Baza CV")}</h3>
            <p>{t("Przeglądaj tysiące CV kandydatów")}</p>
            <a href="src/bazacv.html" className="feature-btn">{t("Zobacz")}</a>
          </div>
        </div>
      </div>
    </>
  );
}
