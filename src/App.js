import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    handleLoadRepositories();
  }, []);

  async function handleLoadRepositories() {
    const response = await api.get('repositories');

    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const data = {
      title: `Novo repository ${Date.now()}`,
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios',
      techs: ['ReactJS', 'NodeJS', 'ReactNative'],
    };
    const response = await api.post('repositories', data);

    setRepositories([
      ...repositories,
      response.data
    ]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`)

      setRepositories(repositories.filter(repository => repository.id !== id));

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <h1>{repository.title}</h1>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
