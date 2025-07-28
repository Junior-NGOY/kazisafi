import { useEffect } from 'react';

const TestAPI = () => {
  useEffect(() => {
    // Test de l'API health
    fetch('http://localhost:3001/api/health')
      .then(res => res.json())
      .then(data => console.log('Health check:', data))
      .catch(err => console.error('Health check error:', err));

    // Test de l'API services
    fetch('http://localhost:3001/api/services')
      .then(res => res.json())
      .then(data => console.log('Services:', data))
      .catch(err => console.error('Services error:', err));

    // Test de l'API projects
    fetch('http://localhost:3001/api/projects')
      .then(res => res.json())
      .then(data => console.log('Projects:', data))
      .catch(err => console.error('Projects error:', err));

    // Test de l'API blog
    fetch('http://localhost:3001/api/blog')
      .then(res => res.json())
      .then(data => console.log('Blog:', data))
      .catch(err => console.error('Blog error:', err));

    // Test de l'API settings
    fetch('http://localhost:3001/api/settings')
      .then(res => res.json())
      .then(data => console.log('Settings:', data))
      .catch(err => console.error('Settings error:', err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test API</h1>
      <p className="text-gray-600">Vérifiez la console pour voir les résultats des appels API.</p>
      <div className="mt-4 p-4 bg-blue-100 rounded">
        <p><strong>URLs à tester :</strong></p>
        <ul className="mt-2 space-y-1">
          <li>• Frontend: <a href="http://localhost:5173" className="text-blue-600">http://localhost:5173</a></li>
          <li>• API Health: <a href="http://localhost:3001/api/health" className="text-blue-600">http://localhost:3001/api/health</a></li>
          <li>• Services: <a href="http://localhost:3001/api/services" className="text-blue-600">http://localhost:3001/api/services</a></li>
          <li>• Admin: <a href="http://localhost:5173/admin" className="text-blue-600">http://localhost:5173/admin</a></li>
        </ul>
      </div>
    </div>
  );
};

export default TestAPI;
