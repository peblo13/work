// Globalne logowanie nieobsłużonych błędów
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

if (!global.fetch) {
  global.fetch = fetch;
}

const app = express();
const PORT = 5001; // Ustawiony na 5001 dla proxy Vite

// If you want real Jooble results, set JOOBLE_API_KEY in env before starting the server
const JOOBLE_API_KEY = process.env.JOOBLE_API_KEY || '308b2058-1f34-451c-b28a-c25956935603';
console.log('process.env.JOOBLE_API_KEY:', process.env.JOOBLE_API_KEY);
console.log('JOOBLE_API_KEY set:', !!JOOBLE_API_KEY, JOOBLE_API_KEY ? 'YES' : 'NO');
console.log('JOOBLE_API_KEY value:', JOOBLE_API_KEY);

app.use(cors());
app.use(express.json());

// Endpoint do pobierania ofert pracy z prostą paginacją i filtrowaniem
app.get('/api/jobs', async (req, res) => {
  console.log('Request received for /api/jobs');
  console.log('Endpoint hit, keywords:', req.query.keywords, 'location:', req.query.location);
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const per_page = Math.max(1, parseInt(req.query.per_page) || 20);
  const keywords = (req.query.keywords || '').toString();
  const location = (req.query.location || '').toString();

  console.log('Parsed keywords:', keywords, 'location:', location);
  console.log('JOOBLE_API_KEY length:', JOOBLE_API_KEY.length);
  // Always fetch from Jooble API
  console.log('JOOBLE_API_KEY at runtime:', JOOBLE_API_KEY, typeof JOOBLE_API_KEY);
  console.log('Fetching Jooble for jobs with keywords:', keywords, 'location:', location);
  try {
    const joobleUrl = `https://jooble.org/api/${JOOBLE_API_KEY}`;
    const body = {
      keywords: keywords,
      location: location,
      page,
      per_page
    };

    console.log('Jooble request body:', body);
    const r = await fetch(joobleUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    console.log('Jooble response status:', r.status);
    const text = await r.text();
    let json;
    try {
      json = JSON.parse(text);
    } catch (e) {
      return res.status(502).json({ error: 'Jooble API error', status: r.status, body: text, parseError: e.message });
    }
    if (!r.ok) {
      return res.status(502).json({ error: 'Jooble API error', status: r.status, body: json });
    }
    console.log('Jooble response:', json);

    // Jooble response formats vary; try to map common fields to our shape
    const joobleJobs = (json.jobs || json.results || json) ;

    // If the API returned an object with metadata, try to extract list
    const list = Array.isArray(joobleJobs) ? joobleJobs : (Array.isArray(json.results) ? json.results : []);

    const mapped = (list || []).map((item, idx) => ({
      id: item.id || item.jobId || `${page}-${idx}`,
      title: item.title || item.position || item.name || 'Oferta pracy',
      company: item.company || item.employer || item.source || 'Nieznany pracodawca',
      location: item.location || item.city || item.region || location || 'N/D',
      link: item.link || item.url || item.redirectUrl || '#',
      snippet: item.snippet || item.description || item.summary || ''
    }));

    const total = json.totalCount || json.total || json.count || mapped.length;
    console.log('Calculated total:', total, 'json.totalCount:', json.totalCount, 'mapped.length:', mapped.length);

    return res.json({ page, per_page, total, jobs: mapped });
  } catch (err) {
    console.error('Error querying Jooble:', err);
    return res.status(500).json({ error: 'Error querying Jooble', details: err.message });
  }
});

// Endpoint do pobierania ranking krajów z największą liczbą ofert
app.get('/api/country-ranking', async (req, res) => {
  const expand = req.query.expand === 'true';
  try {
    const countries = ['USA', 'India', 'Canada', 'UK', 'Germany', 'Australia', 'France', 'Brazil', 'Poland', 'Netherlands'];
    const ranking = [];

    for (const country of countries) {
      console.log('Fetching Jooble for country:', country);
      try {
        const joobleUrl = `https://jooble.org/api/${JOOBLE_API_KEY}`;
        const r = await fetch(joobleUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keywords: "job", location: country, page: 1, per_page: 1 }),
        });
        console.log('Jooble response status for', country, ':', r.status);

        if (r.ok) {
          const json = await r.json();
          ranking.push({ country, count: json.totalCount || 0 });
          console.log('Jooble total for', country, ':', json.totalCount);
        } else {
          const text = await r.text();
          console.error('Jooble error for', country, ':', r.status, text);
        }
      } catch (err) {
        console.error('Fetch error for', country, ':', err.message);
      }
    }

    ranking.sort((a, b) => b.count - a.count);
    console.log('Country ranking from Jooble:', ranking);
    console.log('expand:', expand);
    const result = { ranking: expand ? ranking : ranking.slice(0, 3) };
    console.log('Sending ranking:', result);
    res.json(result);
  } catch (err) {
    console.error('Error fetching country ranking:', err);
    res.json({ ranking: [
      { country: 'USA', count: 1000000 },
      { country: 'India', count: 800000 },
      { country: 'Canada', count: 500000 },
      { country: 'UK', count: 400000 },
      { country: 'Germany', count: 350000 },
      { country: 'Australia', count: 300000 },
      { country: 'France', count: 250000 },
      { country: 'Brazil', count: 200000 },
      { country: 'Mexico', count: 150000 },
      { country: 'Russia', count: 100000 }
    ] }); // Fallback
  }
});


// Prosty endpoint root do testów
app.get('/', (req, res) => {
  res.send('Serwer Express działa!');
});

app.listen(PORT, () => {
  console.log('App listening on port', PORT);
  console.log(`API serwer działa na http://localhost:${PORT}`);
});
