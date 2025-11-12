export default async (req, context) => {
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

  return new Response(JSON.stringify({ ranking }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};