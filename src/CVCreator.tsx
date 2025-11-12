import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CVCreator.css';
import Ad from './components/Ad';

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

const CVCreator: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cvData, setCvData] = useState<CVData>({
    photo: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      birthDate: '',
      linkedin: '',
      website: '',
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    summary: '',
    consent: false,
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setCvData(prev => ({
          ...prev,
          photo: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setCvData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setCvData(prev => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: '',
      level: 1,
    };
    setCvData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, field: string, value: string | number) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id),
    }));
  };

  const addLanguage = () => {
    const newLang = {
      id: Date.now().toString(),
      name: '',
      level: 1,
    };
    setCvData(prev => ({
      ...prev,
      languages: [...prev.languages, newLang],
    }));
  };

  const updateLanguage = (id: string, field: string, value: string | number) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  };

  const removeLanguage = (id: string) => {
    setCvData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id),
    }));
  };

  const renderStarRating = (level: number, onChange: (rating: number) => void) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= level ? 'filled' : ''}`}
            onClick={() => onChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const generateCV = () => {
    // Save CV data to localStorage
    localStorage.setItem('cvData', JSON.stringify(cvData));

    // Navigate to CV preview or template
    navigate('/cv-preview');
  };

  return (
    <div className="cv-creator">
      <div className="form-container">
        <h1>CV Creator</h1>

        {/* Google AdSense Banner */}
        <Ad slot="5566778899" format="horizontal" className="banner-top" />

        {/* Photo Upload Section */}
        <div className="form-section photo-upload-section">
          <h2>Zdjęcie</h2>
          <div className="photo-upload">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div className="photo-preview">
              {cvData.photo ? (
                <img src={cvData.photo} alt="Profile" />
              ) : (
                <div className="photo-placeholder">
                  <span>Kliknij aby dodać zdjęcie</span>
                </div>
              )}
            </div>
            <button
              type="button"
              className="upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Wybierz zdjęcie
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="form-section">
          <h2>Informacje osobiste</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Imię:</label>
              <input
                type="text"
                value={cvData.personalInfo.firstName}
                onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Nazwisko:</label>
              <input
                type="text"
                value={cvData.personalInfo.lastName}
                onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Telefon:</label>
              <input
                type="tel"
                value={cvData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              />
            </div>
            <div className="form-group full-width">
              <label>Adres:</label>
              <input
                type="text"
                value={cvData.personalInfo.address}
                onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Data urodzenia:</label>
              <input
                type="date"
                value={cvData.personalInfo.birthDate}
                onChange={(e) => handlePersonalInfoChange('birthDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>LinkedIn:</label>
              <input
                type="url"
                value={cvData.personalInfo.linkedin}
                onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Strona WWW:</label>
              <input
                type="url"
                value={cvData.personalInfo.website}
                onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="form-section">
          <h2>Doświadczenie zawodowe</h2>
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="experience-item">
              <div className="form-grid">
                <div className="form-group">
                  <label>Stanowisko:</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Firma:</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Data rozpoczęcia:</label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Data zakończenia:</label>
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Opis:</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeExperience(exp.id)}
              >
                Usuń
              </button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addExperience}>
            Dodaj doświadczenie
          </button>
        </div>

        {/* Education */}
        <div className="form-section">
          <h2>Wykształcenie</h2>
          {cvData.education.map((edu) => (
            <div key={edu.id} className="education-item">
              <div className="form-grid">
                <div className="form-group">
                  <label>Stopień/Tytuł:</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Uczelnia:</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Data rozpoczęcia:</label>
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Data zakończenia:</label>
                  <input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Opis:</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeEducation(edu.id)}
              >
                Usuń
              </button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addEducation}>
            Dodaj wykształcenie
          </button>
        </div>

        {/* Skills */}
        <div className="form-section">
          <h2>Umiejętności</h2>
          {cvData.skills.map((skill) => (
            <div key={skill.id} className="skill-item">
              <div className="skill-input-group">
                <input
                  type="text"
                  placeholder="Nazwa umiejętności"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                />
                {renderStarRating(skill.level, (rating) => updateSkill(skill.id, 'level', rating))}
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeSkill(skill.id)}
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addSkill}>
            Dodaj umiejętność
          </button>
        </div>

        {/* Languages */}
        <div className="form-section">
          <h2>Języki</h2>
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="language-item">
              <div className="language-input-group">
                <input
                  type="text"
                  placeholder="Nazwa języka"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                />
                {renderStarRating(lang.level, (rating) => updateLanguage(lang.id, 'level', rating))}
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeLanguage(lang.id)}
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addLanguage}>
            Dodaj język
          </button>
        </div>

        {/* Summary */}
        <div className="form-section summary-section">
          <h2>Podsumowanie zawodowe</h2>
          <div className="summary-container">
            <textarea
              className="summary-textarea"
              value={cvData.summary}
              onChange={(e) => setCvData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Napisz krótkie podsumowanie swojej kariery zawodowej, umiejętności i celów..."
              rows={6}
            />
          </div>

          {/* Consent Section */}
          <div className="consent-section">
            <div className="consent-checkbox">
              <input
                type="checkbox"
                id="cv-consent"
                checked={cvData.consent}
                onChange={(e) => setCvData(prev => ({ ...prev, consent: e.target.checked }))}
              />
              <label htmlFor="cv-consent" className="consent-label">
                <span className="consent-text">
                  Wyrażam zgodę na dodanie mojego CV do bazy aktualnych CV Workplanetjobs.com.
                  Pozwala to pracodawcom i rekruterom na wyszukiwanie kandydatów oraz proponowanie
                  ofert pracy, awansów lub innych możliwości rozwoju kariery.
                </span>
                <span className="consent-text privacy-clause">
                  <strong>Klauzula informacyjna o przetwarzaniu danych osobowych:</strong><br/>
                  Administratorem danych osobowych jest Workplanetjobs.com z siedzibą w Polsce.
                  Dane osobowe będą przetwarzane w celu umożliwienia pracodawcom i rekruterom
                  wyszukiwania kandydatów oraz kontaktowania się z nimi w sprawie ofert pracy.
                  Podstawą prawną przetwarzania jest zgoda (art. 6 ust. 1 lit. a RODO).
                  Dane będą przechowywane przez okres 2 lat od momentu wyrażenia zgody lub do jej odwołania.
                  Przysługuje Pani/Panu prawo do cofnięcia zgody w dowolnym momencie,
                  prawo dostępu do danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania.
                  Kontakt: privacy@workplanetjobs.com
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Generate CV Button */}
        <div className="form-actions">
          <button type="button" className="generate-btn" onClick={generateCV}>
            Generuj CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVCreator;