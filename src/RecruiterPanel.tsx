import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './RecruiterPanel.css';
import Ad from './components/Ad';

const RecruiterPanel: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [jobOffers, setJobOffers] = useState<any[]>([]);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [buttonTest, setButtonTest] = useState(false);
  const [calendarEvents] = useState<any[]>([
    {
      id: 1,
      title: 'Rozmowa z Anną Kowalską',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      candidate: 'Anna Kowalska',
      position: 'Frontend Developer',
      type: 'interview'
    },
    {
      id: 2,
      title: 'Spotkanie rekrutacyjne',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // jutro
      time: '10:00',
      candidate: 'Marcin Nowak',
      position: 'Backend Developer',
      type: 'meeting'
    }
  ]);
  const [messageTemplates, setMessageTemplates] = useState<any[]>([
    {
      id: 1,
      name: 'Zaproszenie na rozmowę',
      subject: 'Zaproszenie na rozmowę kwalifikacyjną - {position}',
      content: 'Szanowny Kandidacie,\n\nSerdecznie zapraszamy na rozmowę kwalifikacyjną na stanowisko {position}.\n\nTermin: {date}\nMiejsce: {location}\n\nProsimy o potwierdzenie przybycia.\n\nZ poważaniem,\n{company}'
    },
    {
      id: 2,
      name: 'Odrzucenie aplikacji',
      subject: 'Aktualizacja statusu aplikacji - {position}',
      content: 'Szanowny Kandidacie,\n\nDziękujemy za zainteresowanie stanowiskiem {position} w naszej firmie.\n\nPo przeanalizowaniu wszystkich aplikacji, zdecydowaliśmy się na inny profil kandydata.\n\nŻyczymy powodzenia w dalszych poszukiwaniach.\n\nZ poważaniem,\n{company}'
    },
    {
      id: 3,
      name: 'Zaakceptowanie aplikacji',
      subject: 'Gratulacje! Zostanie Pan/Pani zatrudniony/a',
      content: 'Szanowny Kandidacie,\n\nGratulujemy! Po pozytywnej rozmowie kwalifikacyjnej zdecydowaliśmy się na zatrudnienie Pana/Pani na stanowisku {position}.\n\nSzczegóły zatrudnienia:\n- Data rozpoczęcia: {start_date}\n- Wynagrodzenie: {salary}\n\nProsimy o kontakt w celu omówienia szczegółów.\n\nZ poważaniem,\n{company}'
    }
  ]);
  const [analyticsDays, setAnalyticsDays] = useState(30);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    contractType: 'pełny etat',
    workType: 'stacjonarny',
    availability: 'od zaraz',
    level: 'mid',
    employmentType: 'pełny etat'
  });

  useEffect(() => {
    // Load user data
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }

    // Load sample data
    loadSampleData();
  }, []);

  const handleAddJob = () => {
    if (!newJob.title || !newJob.company || !newJob.location) {
      alert('Proszę wypełnić wymagane pola: tytuł, firma, lokalizacja');
      return;
    }

    const job = {
      id: Date.now(),
      title: newJob.title,
      company: newJob.company,
      location: newJob.location,
      salary: newJob.salary,
      description: newJob.description,
      requirements: newJob.requirements,
      benefits: newJob.benefits,
      contractType: newJob.contractType,
      workType: newJob.workType,
      availability: newJob.availability,
      level: newJob.level,
      employmentType: newJob.employmentType,
      status: 'active',
      applications: 0,
      postedDate: new Date().toISOString().split('T')[0],
      postedBy: currentUser?.name || 'Rekruter'
    };

    const updatedJobs = [...jobOffers, job];
    setJobOffers(updatedJobs);
    localStorage.setItem('recruiterJobs', JSON.stringify(updatedJobs));

    // Reset form
    setNewJob({
      title: '',
      company: '',
      location: '',
      salary: '',
      description: '',
      requirements: '',
      benefits: '',
      contractType: 'pełny etat',
      workType: 'stacjonarny',
      availability: 'od zaraz',
      level: 'mid',
      employmentType: 'pełny etat'
    });
    setShowAddJobModal(false);
  };

  const handleDeleteJob = (jobId: number) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę ofertę pracy?')) {
      const updatedJobs = jobOffers.filter(job => job.id !== jobId);
      setJobOffers(updatedJobs);
      localStorage.setItem('recruiterJobs', JSON.stringify(updatedJobs));
    }
  };

  const loadSampleData = () => {
    // Load saved jobs from localStorage or use sample data
    const savedJobs = localStorage.getItem('recruiterJobs');
    if (savedJobs) {
      setJobOffers(JSON.parse(savedJobs));
    } else {
      // Sample job offers
      const sampleJobs = [
        {
          id: 1,
          title: 'Frontend Developer',
          company: 'TechCorp',
          location: 'Warszawa',
          salary: '8000-12000 PLN',
          status: 'active',
          applications: 12,
          postedDate: '2024-01-15'
        },
        {
          id: 2,
          title: 'Backend Developer',
          company: 'DataSys',
          location: 'Kraków',
          salary: '9000-13000 PLN',
          status: 'active',
          applications: 8,
          postedDate: '2024-01-10'
        }
      ];
      setJobOffers(sampleJobs);
    }

    // Sample candidates (always load sample for now)
    const sampleCandidates = [
      {
        id: 1,
        name: 'Anna Kowalska',
        position: 'Frontend Developer',
        location: 'Warszawa',
        experience: '3-5 lat',
        status: 'new',
        appliedDate: '2024-01-16'
      },
      {
        id: 2,
        name: 'Marcin Nowak',
        position: 'Backend Developer',
        location: 'Kraków',
        experience: '5-10 lat',
        status: 'reviewed',
        appliedDate: '2024-01-14'
      }
    ];

    setCandidates(sampleCandidates);
  };

  // Handler functions for buttons
  const handleViewCV = (candidateId: number) => {
    alert(`Otwieranie CV kandydata ${candidateId}`);
  };

  const handleContactCandidate = (candidateId: number) => {
    alert(`Kontaktowanie kandydata ${candidateId}`);
  };

  const handleHireCandidate = (candidateId: number) => {
    alert(`Zatrudnianie kandydata ${candidateId}`);
  };

  const handleAnalyticsDaysChange = (days: number) => {
    setAnalyticsDays(days);
    // In a real app, this would fetch new data based on the selected period
    alert(`Zmiana okresu na ostatnie ${days} dni`);
  };

  const handleEditTemplate = (templateId: number) => {
    alert(`Edycja szablonu ${templateId}`);
  };

  const handleSendTemplate = (templateId: number) => {
    alert(`Wysyłanie szablonu ${templateId}`);
  };

  const handleDeleteTemplate = (templateId: number) => {
    alert(`Usuwanie szablonu ${templateId}`);
  };

  const handleChangePassword = () => {
    alert('Funkcja zmiany hasła - otwórz modal');
  };

  const handleEnable2FA = () => {
    alert('Włączanie 2FA - otwórz konfigurację');
  };

  const handleConnectIntegration = (service: string) => {
    alert(`Łączenie z ${service}`);
  };

  const renderDashboard = () => (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{t("Aktywne oferty")}</h3>
          <div className="stat-number">{jobOffers.filter(job => job.status === 'active').length}</div>
        </div>
        <div className="stat-card">
          <h3>{t("Łączne aplikacje")}</h3>
          <div className="stat-number">{jobOffers.reduce((sum, job) => sum + job.applications, 0)}</div>
        </div>
        <div className="stat-card">
          <h3>Nowi kandydaci</h3>
          <div className="stat-number">{candidates.filter(c => c.status === 'new').length}</div>
        </div>
        <div className="stat-card">
          <h3>Przejrzani kandydaci</h3>
          <div className="stat-number">{candidates.filter(c => c.status === 'reviewed').length}</div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Ostatnia aktywność</h3>
        <div className="activity-list">
          {candidates.slice(0, 5).map(candidate => (
            <div key={candidate.id} className="activity-item">
              <span className="activity-text">
                {candidate.name} aplikował na stanowisko {candidate.position}
              </span>
              <span className="activity-date">{candidate.appliedDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderJobOffers = () => (
    <div className="job-offers">
      <div className="section-header">
        <h3>Zarządzanie ofertami pracy</h3>
        <button className="btn-primary" onClick={() => setShowAddJobModal(true)}>+ Dodaj nową ofertę</button>
      </div>

      <div className="offers-list">
        {jobOffers.map(job => (
          <div key={job.id} className="offer-card">
            <div className="offer-header">
              <h4>{job.title}</h4>
              <span className={`status ${job.status}`}>{job.status}</span>
            </div>
            <div className="offer-details">
              <p><strong>Firma:</strong> {job.company}</p>
              <p><strong>Lokalizacja:</strong> {job.location}</p>
              <p><strong>Wynagrodzenie:</strong> {job.salary}</p>
              <p><strong>Rodzaj umowy:</strong> {job.contractType}</p>
              <p><strong>Tryb pracy:</strong> {job.workType}</p>
              <p><strong>Dostępność:</strong> {job.availability}</p>
              <p><strong>Poziom:</strong> {job.level}</p>
              <p><strong>Aplikacje:</strong> {job.applications}</p>
              <p><strong>Data publikacji:</strong> {job.postedDate}</p>
            </div>
            <div className="offer-actions">
              <button className="btn-secondary">Edytuj</button>
              <button className="btn-secondary">Zobacz aplikacje</button>
              <button className="btn-danger" onClick={() => handleDeleteJob(job.id)}>Usuń</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCandidates = () => (
    <div className="candidates">
      <div className="section-header">
        <h3>{t("Przegląd kandydatów")}</h3>
        <button className="btn-primary" onClick={() => window.location.href = 'src/bazacv.html'}>
          📋 {t("Przejdź do bazy CV")}
        </button>
      </div>

      <div className="candidates-list">
        {candidates.map(candidate => (
          <div key={candidate.id} className="candidate-card">
            <div className="candidate-header">
              <h4>{candidate.name}</h4>
              <span className={`status ${candidate.status}`}>{candidate.status}</span>
            </div>
            <div className="candidate-details">
              <p><strong>{t("Stanowisko")}:</strong> {candidate.position}</p>
              <p><strong>{t("Lokalizacja")}:</strong> {candidate.location}</p>
              <p><strong>{t("Doświadczenie")}:</strong> {candidate.experience}</p>
              <p><strong>{t("Data aplikacji")}:</strong> {candidate.appliedDate}</p>
            </div>
            <div className="candidate-actions">
              <button className="btn-secondary" onClick={() => handleViewCV(candidate.id)}>{t("Zobacz CV")}</button>
              <button className="btn-secondary" onClick={() => handleContactCandidate(candidate.id)}>{t("Kontakt")}</button>
              <button className="btn-success" onClick={() => handleHireCandidate(candidate.id)}>{t("Zatrudnij")}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics">
      <div className="section-header">
        <h3>📈 {t("Analizy i statystyki")}</h3>
        <div className="analytics-controls">
          <select value={analyticsDays} onChange={(e) => handleAnalyticsDaysChange(Number(e.target.value))}>
            <option value={7}>{t("Ostatnie 7 dni")}</option>
            <option value={30}>{t("Ostatnie 30 dni")}</option>
            <option value={90}>{t("Ostatnie 90 dni")}</option>
          </select>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h4>👁️ {t("Wyświetlenia ofert")}</h4>
          <div className="metric-large">2,847</div>
          <div className="metric-change positive">+12.5% vs poprzedni okres</div>
          <div className="mini-chart">
            <div className="chart-bar" style={{height: '60%'}}></div>
            <div className="chart-bar" style={{height: '75%'}}></div>
            <div className="chart-bar" style={{height: '80%'}}></div>
            <div className="chart-bar" style={{height: '90%'}}></div>
            <div className="chart-bar" style={{height: '85%'}}></div>
          </div>
        </div>

        <div className="analytics-card">
          <h4>📧 {t("Aplikacje")}</h4>
          <div className="metric-large">156</div>
          <div className="metric-change positive">+8.2% vs poprzedni okres</div>
          <div className="conversion-rate">Konwersja: 5.5%</div>
        </div>

        <div className="analytics-card">
          <h4>⏱️ {t("Średni czas zatrudnienia")}</h4>
          <div className="metric-large">18 dni</div>
          <div className="metric-change negative">+2 dni vs poprzedni okres</div>
        </div>

        <div className="analytics-card">
          <h4>🎯 {t("Efektywność rekrutacji")}</h4>
          <div className="metric-large">87%</div>
          <div className="metric-change positive">+5% vs poprzedni okres</div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-container">
          <h4>Aplikacje wg stanowisk</h4>
          <div className="chart-placeholder">
            <div className="chart-item">
              <span>Frontend Developer</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '75%'}}></div>
              </div>
              <span>42</span>
            </div>
            <div className="chart-item">
              <span>Backend Developer</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '60%'}}></div>
              </div>
              <span>28</span>
            </div>
            <div className="chart-item">
              <span>Full Stack Developer</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '45%'}}></div>
              </div>
              <span>18</span>
            </div>
          </div>
        </div>

        <div className="chart-container">
          <h4>Źródła aplikacji</h4>
          <div className="chart-placeholder">
            <div className="source-item">
              <span>Workplanetjobs.com</span>
              <span className="source-percentage">68%</span>
            </div>
            <div className="source-item">
              <span>LinkedIn</span>
              <span className="source-percentage">22%</span>
            </div>
            <div className="source-item">
              <span>Inne portale</span>
              <span className="source-percentage">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="calendar">
      <div className="section-header">
        <h3>📅 {t("Kalendarz rekrutacyjny")}</h3>
        <button className="btn-primary" onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Dodaj wydarzenie clicked - test');
          setButtonTest(!buttonTest);
        }}>
          {buttonTest ? '✅ Przycisk działa!' : t('Dodaj wydarzenie')}
        </button>
      </div>

      <div className="calendar-grid">
        <div className="calendar-sidebar">
          <h4>{t("Dzisiejsze wydarzenia")}</h4>
          <div className="events-list">
            {calendarEvents.filter(event => event.date === new Date().toISOString().split('T')[0]).map(event => (
              <div key={event.id} className="event-item">
                <div className="event-time">{event.time}</div>
                <div className="event-details">
                  <div className="event-title">{event.title}</div>
                  <div className="event-candidate">{event.candidate}</div>
                  <div className="event-position">{event.position}</div>
                </div>
                <div className={`event-type ${event.type}`}>{event.type}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="calendar-main">
          <div className="calendar-header">
            <button className="nav-btn">‹</button>
            <h4>{new Date().toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}</h4>
            <button className="nav-btn">›</button>
          </div>
          <div className="calendar-days">
            {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {Array.from({length: 35}, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - date.getDay() + i);
              const dayEvents = calendarEvents.filter(event => event.date === date.toISOString().split('T')[0]);
              return (
                <div key={i} className={`calendar-day ${dayEvents.length > 0 ? 'has-events' : ''}`}>
                  <div className="day-number">{date.getDate()}</div>
                  {dayEvents.map(event => (
                    <div key={event.id} className="day-event">
                      {event.time} - {event.candidate}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="templates">
      <div className="section-header">
        <h3>📝 {t("Szablony wiadomości")}</h3>
        <button className="btn-primary" onClick={() => setMessageTemplates([...messageTemplates, {
          id: Date.now(),
          name: 'Nowy szablon',
          subject: 'Temat wiadomości',
          content: 'Treść wiadomości...'
        }])}>
          ➕ {t("Nowy szablon")}
        </button>
      </div>

      <div className="templates-grid">
        {messageTemplates.map(template => (
          <div key={template.id} className="template-card">
            <div className="template-header">
              <h4>{template.name}</h4>
              <div className="template-actions">
                <button className="btn-icon" onClick={() => handleEditTemplate(template.id)}>{t("Edytuj")}</button>
                <button className="btn-icon" onClick={() => handleSendTemplate(template.id)}>{t("Wyślij")}</button>
                <button className="btn-icon" onClick={() => handleDeleteTemplate(template.id)}>{t("Usuń")}</button>
              </div>
            </div>
            <div className="template-content">
              <div className="template-subject">
                <strong>Temat:</strong> {template.subject}
              </div>
              <div className="template-body">
                {template.content.split('\n').slice(0, 3).join('\n')}...
              </div>
            </div>
            <div className="template-variables">
              <small>Dostępne zmienne: {'{company}'}, {'{position}'}, {'{candidate}'}, {'{date}'}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings">
      <div className="section-header">
        <h3>⚙️ {t("Ustawienia konta")}</h3>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h4>👤 {t("Profil firmy")}</h4>
          <div className="setting-item">
            <label>{t("Nazwa firmy")}</label>
            <input type="text" defaultValue={currentUser?.company || ''} />
          </div>
          <div className="setting-item">
            <label>{t("Opis firmy")}</label>
            <textarea rows={3} defaultValue="Opis firmy..." />
          </div>
          <div className="setting-item">
            <label>{t("Logo firmy")}</label>
            <div className="file-upload">
              <input type="file" accept="image/*" id="logo-upload" style={{display: 'none'}} />
              <label htmlFor="logo-upload" className="file-upload-btn">Wybierz plik</label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h4>🔔 {t("Powiadomienia")}</h4>
          <div className="setting-item">
            <label>
              <input type="checkbox" defaultChecked />
              {t("Nowe aplikacje")}
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input type="checkbox" defaultChecked />
              {t("Przypomnienia o rozmowach")}
            </label>
          </div>
          <div className="setting-item">
            <label>
              <input type="checkbox" />
              {t("Raporty tygodniowe")}
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h4>🔒 {t("Bezpieczeństwo")}</h4>
          <div className="setting-item">
            <label>{t("Zmiana hasła")}</label>
            <button className="btn-secondary" onClick={handleChangePassword}>{t("Zmień hasło")}</button>
          </div>
          <div className="setting-item">
            <label>{t("Uwierzytelnianie dwuskładnikowe")}</label>
            <button className="btn-secondary" onClick={handleEnable2FA}>{t("Włącz 2FA")}</button>
          </div>
        </div>

        <div className="settings-section">
          <h4>📊 {t("Integracje")}</h4>
          <div className="integration-item">
            <div className="integration-info">
              <h5>LinkedIn</h5>
              <p>Importuj profile kandydatów</p>
            </div>
            <button className="btn-secondary" onClick={() => handleConnectIntegration('LinkedIn')}>{t("Połącz")}</button>
          </div>
          <div className="integration-item">
            <div className="integration-info">
              <h5>Google Calendar</h5>
              <p>Synchronizuj kalendarz rekrutacyjny</p>
            </div>
            <button className="btn-secondary" onClick={() => handleConnectIntegration('Google Calendar')}>{t("Połącz")}</button>
          </div>
          <div className="integration-item">
            <div className="integration-info">
              <h5>Slack</h5>
              <p>Powiadomienia o nowych aplikacjach</p>
            </div>
            <button className="btn-secondary" onClick={() => handleConnectIntegration('Slack')}>{t("Połącz")}</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="recruiter-panel">
      <header className="panel-header">
        <div className="header-content">
          <h1>🏢 {t("Panel Rekrutera")}</h1>
          <div className="user-info">
            <span>👋 Witaj, {currentUser?.name || 'Rekruter'}!</span>
            <span>🏢 {currentUser?.company || 'Firma'}</span>
            <span>{currentUser?.planIcon} {currentUser?.plan || 'Plan'}</span>
          </div>
        </div>
        <Link to="/" className="back-btn">← {t("Powrót do strony głównej")}</Link>
      </header>

      <nav className="panel-nav">
        <button
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 {t("Dashboard")}
        </button>
        <button
          className={activeTab === 'jobs' ? 'active' : ''}
          onClick={() => setActiveTab('jobs')}
        >
          💼 {t("Oferty pracy")}
        </button>
        <button
          className={activeTab === 'candidates' ? 'active' : ''}
          onClick={() => setActiveTab('candidates')}
        >
          👥 {t("Kandydaci")}
        </button>
        <button
          className={activeTab === 'analytics' ? 'active' : ''}
          onClick={() => setActiveTab('analytics')}
        >
          📈 {t("Analizy")}
        </button>
        <button
          className={activeTab === 'calendar' ? 'active' : ''}
          onClick={() => setActiveTab('calendar')}
        >
          📅 {t("Kalendarz")}
        </button>
        <button
          className={activeTab === 'templates' ? 'active' : ''}
          onClick={() => setActiveTab('templates')}
        >
          📝 {t("Szablony")}
        </button>
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ {t("Ustawienia")}
        </button>
      </nav>

      {/* Google AdSense Banner */}
      <Ad slot="1122334455" format="horizontal" className="banner-top" />

      <main className="panel-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'jobs' && renderJobOffers()}
        {activeTab === 'candidates' && renderCandidates()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'settings' && renderSettings()}
      </main>

      {/* Add Job Modal */}
      {showAddJobModal && (
        <div className="modal-overlay" onClick={() => setShowAddJobModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>➕ Dodaj nową ofertę pracy</h2>
              <button className="close-btn" onClick={() => setShowAddJobModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => { e.preventDefault(); handleAddJob(); }}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tytuł stanowiska *</label>
                    <input
                      type="text"
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                      placeholder="np. Frontend Developer"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Nazwa firmy *</label>
                    <input
                      type="text"
                      value={newJob.company}
                      onChange={(e) => setNewJob({...newJob, company: e.target.value})}
                      placeholder="np. TechCorp"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Lokalizacja *</label>
                    <input
                      type="text"
                      value={newJob.location}
                      onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                      placeholder="np. Warszawa"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Wynagrodzenie</label>
                    <input
                      type="text"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({...newJob, salary: e.target.value})}
                      placeholder="np. 8000-12000 PLN"
                    />
                  </div>
                </div>

                {/* Dodatkowe opcje */}
                <div className="form-section">
                  <h3>📋 Szczegóły zatrudnienia</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Rodzaj umowy</label>
                      <select
                        value={newJob.contractType}
                        onChange={(e) => setNewJob({...newJob, contractType: e.target.value})}
                      >
                        <option value="pełny etat">Pełny etat</option>
                        <option value="część etatu">Część etatu</option>
                        <option value="umowa zlecenie">Umowa zlecenie</option>
                        <option value="B2B">B2B</option>
                        <option value="umowa o dzieło">Umowa o dzieło</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Wymiar zatrudnienia</label>
                      <select
                        value={newJob.employmentType}
                        onChange={(e) => setNewJob({...newJob, employmentType: e.target.value})}
                      >
                        <option value="pełny etat">Pełny etat</option>
                        <option value="3/4 etatu">3/4 etatu</option>
                        <option value="1/2 etatu">1/2 etatu</option>
                        <option value="1/4 etatu">1/4 etatu</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Tryb pracy</label>
                      <select
                        value={newJob.workType}
                        onChange={(e) => setNewJob({...newJob, workType: e.target.value})}
                      >
                        <option value="stacjonarny">Stacjonarny</option>
                        <option value="hybrydowy">Hybrydowy</option>
                        <option value="zdalny">Zdalny</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Poziom stanowiska</label>
                      <select
                        value={newJob.level}
                        onChange={(e) => setNewJob({...newJob, level: e.target.value})}
                      >
                        <option value="junior">Junior</option>
                        <option value="mid">Mid</option>
                        <option value="senior">Senior</option>
                        <option value="expert">Expert</option>
                        <option value="lead">Lead</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Dostępność stanowiska</label>
                    <select
                      value={newJob.availability}
                      onChange={(e) => setNewJob({...newJob, availability: e.target.value})}
                    >
                      <option value="od zaraz">Od zaraz</option>
                      <option value="po okresie wypowiedzenia 1 miesiąc">Po okresie wypowiedzenia (1 miesiąc)</option>
                      <option value="po okresie wypowiedzenia 3 miesiące">Po okresie wypowiedzenia (3 miesiące)</option>
                      <option value="ustalana indywidualnie">Ustalana indywidualnie</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Opis stanowiska</label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    placeholder="Opisz wymagania i obowiązki..."
                    rows={4}
                  />
                </div>
                <div className="form-group">
                  <label>Wymagania</label>
                  <textarea
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                    placeholder="Wymagane umiejętności i doświadczenie..."
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Korzyści</label>
                  <textarea
                    value={newJob.benefits}
                    onChange={(e) => setNewJob({...newJob, benefits: e.target.value})}
                    placeholder="Dodatkowe benefity..."
                    rows={3}
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowAddJobModal(false)}>
                    Anuluj
                  </button>
                  <button type="submit" className="btn-primary">
                    ➕ Dodaj ofertę
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterPanel;