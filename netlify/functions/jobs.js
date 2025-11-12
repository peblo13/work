export default async (req, context) => {
  const { searchParams } = new URL(req.url);
  const keywords = searchParams.get('keywords') || '';
  const location = searchParams.get('location') || '';
  const page = searchParams.get('page') || '1';
  const apiKey = '308b2058-1f34-451c-b28a-c25956935603';

  try {
    const response = await fetch(`https://pl.jooble.org/api/${apiKey}?keywords=${encodeURIComponent(keywords)}&location=${encodeURIComponent(location)}&page=${page}`);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching from Jooble:', error);
    return new Response(JSON.stringify({ jobs: [] }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};