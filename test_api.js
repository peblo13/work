(async () => {
  try {
    const r = await fetch('http://localhost:5001/api/jobs?keywords=developer&location=Warszawa');
    console.log('Status:', r.status);
    const text = await r.text();
    console.log('Response:', text);
  } catch (err) {
    console.log('Error:', err.message);
  }
})();