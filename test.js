const JOOBLE_API_KEY = "308b2058-1f34-451c-b28a-c25956935603";

(async () => {
  try {
    const r = await fetch(`https://jooble.org/api/${JOOBLE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords: "developer", location: "Warszawa", page: 1, per_page: 5 })
    });
    console.log('Status:', r.status);
    const text = await r.text();
    console.log('Response:', text);
  } catch (err) {
    console.log('Error:', err.message);
  }
})();