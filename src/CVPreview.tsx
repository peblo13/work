import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CVPreview.css';

interface CVData {
  photo: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
    linkedin: string;
    website: string;
  };
  experience: Array<{
    id: string;
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: number;
  }>;
  languages: Array<{
    id: string;
    name: string;
    level: number;
  }>;
  summary: string;
  consent: boolean;
}

const CVPreview: React.FC = () => {
  const navigate = useNavigate();
  const [cvData, setCvData] = useState<CVData | null>(null);

  useEffect(() => {
    // Load CV data from localStorage
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
      setCvData(JSON.parse(savedData));
    } else {
      // If no data, redirect back to creator
      navigate('/cv-creator');
    }
  }, [navigate]);

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`cv-star ${i < level ? 'filled' : ''}`}>★</span>
    ));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // For now, just trigger print which can be saved as PDF
    alert('Aby pobrać PDF, użyj funkcji drukowania przeglądarki (Ctrl+P) i wybierz "Zapisz jako PDF"');
    window.print();
  };

  const handleDownloadWord = () => {
    alert('Funkcja pobierania DOCX zostanie wkrótce dodana');
  };

  if (!cvData) {
    return (
      <div className="cv-preview-loading">
        <div>Ładowanie CV...</div>
      </div>
    );
  }

  const fullName = `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}`.trim();

  return (
    <div className="cv-preview">
      {/* Print Button */}
      <button className="cv-print-btn" onClick={handlePrint} title="Drukuj CV">
        🖨️
      </button>

      {/* Download Section */}
      <div className="cv-download-section">
        <h2>💼 Twoje CV - Workplanetjobs.com Professional</h2>
        <p>Możesz wydrukować CV lub pobrać w formacie PDF.</p>
        <div className="cv-photo-info">
          <strong>📷 Zdjęcie profilowe</strong><br />
          Twoje zdjęcie zostało dodane do CV.
        </div>
        <button className="cv-download-btn" onClick={handleDownloadPDF}>
          📄 Pobierz PDF
        </button>
        <button className="cv-download-btn" onClick={handleDownloadWord}>
          📝 Pobierz DOCX
        </button>
      </div>

      {/* CV Container */}
      <div className="cv-container">
        {/* CV Header */}
        <div className="cv-header">
          {/* Photo Section */}
          <div className="cv-photo-section">
            <div className="cv-photo-container">
              {cvData.photo ? (
                <img src={cvData.photo} alt="Zdjęcie CV" className="cv-photo" />
              ) : (
                <div className="cv-photo-placeholder">
                  📷<br />
                  <span>Brak zdjęcia</span>
                </div>
              )}
            </div>
          </div>

          <h1 className="cv-name">{fullName || '[Twoje Imię i Nazwisko]'}</h1>
          <h2 className="cv-title">{cvData.personalInfo.website || '[Twoja Specjalizacja]'}</h2>

          <div className="cv-contact">
            {cvData.personalInfo.email && (
              <div className="cv-contact-item">
                <i>📧</i>
                <span>{cvData.personalInfo.email}</span>
              </div>
            )}
            {cvData.personalInfo.phone && (
              <div className="cv-contact-item">
                <i>📱</i>
                <span>{cvData.personalInfo.phone}</span>
              </div>
            )}
            {cvData.personalInfo.address && (
              <div className="cv-contact-item">
                <i>📍</i>
                <span>{cvData.personalInfo.address}</span>
              </div>
            )}
            {cvData.personalInfo.linkedin && (
              <div className="cv-contact-item">
                <i>💼</i>
                <span>{cvData.personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary Section */}
        {cvData.summary && (
          <div className="cv-section">
            <h3 className="cv-section-title">👨‍💼 Profil zawodowy</h3>
            <div className="cv-item">
              <p className="cv-item-description">{cvData.summary}</p>
            </div>
          </div>
        )}

        {/* Experience Section */}
        {cvData.experience.length > 0 && (
          <div className="cv-section">
            <h3 className="cv-section-title">💼 Doświadczenie zawodowe</h3>
            {cvData.experience.map((exp) => (
              <div key={exp.id} className="cv-item">
                <div className="cv-item-header">
                  <div>
                    <div className="cv-item-title">{exp.position || '[Stanowisko]'}</div>
                    <div className="cv-item-company">{exp.company || '[Nazwa Firmy]'}</div>
                  </div>
                  <div className="cv-item-period">
                    {exp.startDate || '[Data rozpoczęcia]'} - {exp.endDate || 'obecnie'}
                  </div>
                </div>
                <div className="cv-item-description">
                  {exp.description ? exp.description.replace(/\n/g, '<br />') : '[Opisz swoje obowiązki i osiągnięcia]'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education and Languages in two columns */}
        <div className="cv-two-column">
          {/* Education */}
          {cvData.education.length > 0 && (
            <div className="cv-section">
              <h3 className="cv-section-title">🎓 Wykształcenie</h3>
              {cvData.education.map((edu) => (
                <div key={edu.id} className="cv-education-item">
                  <div className="cv-degree">{edu.degree || '[Kierunek/Specjalizacja]'}</div>
                  <div className="cv-school">{edu.institution || '[Nazwa Uczelni/Szkoły]'}</div>
                  <div className="cv-year">
                    {edu.startDate || '[RRRR]'} - {edu.endDate || '[RRRR]'}
                  </div>
                  {edu.description && (
                    <p style={{ color: '#ffffff', marginTop: '10px', fontSize: '0.9rem' }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {cvData.languages.length > 0 && (
            <div className="cv-section">
              <h3 className="cv-section-title">🌍 Języki obce</h3>
              <div className="cv-languages">
                {cvData.languages.map((lang) => (
                  <div key={lang.id} className="cv-language">
                    <div className="cv-language-name">{lang.name || '[Język]'}</div>
                    <div className="cv-language-level">Poziom: {lang.level}/5</div>
                    <div className="cv-language-rating">
                      {renderStars(lang.level)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Skills Section */}
        {cvData.skills.length > 0 && (
          <div className="cv-section">
            <h3 className="cv-section-title">🛠️ Umiejętności techniczne</h3>
            <div className="cv-skills-grid">
              {cvData.skills.map((skill) => (
                <div key={skill.id} className="cv-skill">
                  <span className="cv-skill-name">{skill.name || '[Umiejętność]'}</span>
                  <div className="cv-skill-rating">
                    {renderStars(skill.level)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Editor Button */}
        <div className="cv-actions">
          <button className="cv-back-btn" onClick={() => navigate('/cv-creator')}>
            ← Wróć do edytora
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVPreview;