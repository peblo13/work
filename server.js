// Minimalny backend Node.js/Express do obsługi ofert pracy
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Przykładowe dane ofert pracy
const jobs = [
  {
    title: 'Frontend Developer',
    company: 'Tech Solutions',
    location: 'Warszawa',
    link: 'https://example.com/job/1',
    snippet: 'Twórz nowoczesne aplikacje webowe w React.'
  },
  {
    title: 'Backend Developer',
    company: 'DataCorp',
    location: 'Kraków',
    link: 'https://example.com/job/2',
    snippet: 'Rozwijaj API w Node.js i Express.'
  },
  {
    title: 'Project Manager',
    company: 'BizGroup',
    location: 'Poznań',
    link: 'https://example.com/job/3',
    snippet: 'Zarządzaj zespołem IT i projektami.'
  }
];

// Endpoint do pobierania ofert pracy
app.get('/api/jobs', (req, res) => {
  // Możesz dodać filtrowanie po req.query.keywords, location, page itd.
  res.json({ jobs });
});

// Endpoint do ranking krajów
app.get('/api/country-ranking', (req, res) => {
  const ranking = [
    { country: 'United States', count: 2000 },
    { country: 'Poland', count: 1500 },
    { country: 'Germany', count: 1200 },
    { country: 'United Kingdom', count: 1000 },
    { country: 'France', count: 800 },
    { country: 'Italy', count: 600 },
    { country: 'Spain', count: 500 },
    { country: 'Netherlands', count: 400 },
    { country: 'Sweden', count: 300 },
    { country: 'Denmark', count: 200 },
    { country: 'Norway', count: 100 }
  ];
  res.json({ ranking });
});

app.listen(PORT, () => {
  console.log(`API serwer działa na http://localhost:${PORT}`);
});
