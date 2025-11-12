export default async (req, context) => {
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

  return new Response(JSON.stringify({ jobs }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};