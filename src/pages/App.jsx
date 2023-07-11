import { useState } from 'react';
import { api } from '../services/api';

import githubLogo from '../assets/github.png';

import { Container } from './styles';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import Button from '../components/Button';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`);

    if(data.id) {

      const isExist = repos.find(repo => repo.id === data.id)
      
      if(!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return
      }
    }
    alert('Repositório não encontrada!');
  }

  const handleRemoveRepo = (id) => {
      const newRepo = [...repos];
      const indexRepo = newRepo.findIndex(item => item.id === id);
      newRepo.splice(indexRepo, 1);

      setRepos(newRepo);
  }

  
  return (
    <>
      <Container>
        <img src={githubLogo} width={72} height={72} alt="logo github"/>
        <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
        <Button onClick={handleSearchRepo}/>
        {repos?.map(repo => 
          <ItemRepo 
            handleRemoveRepo={handleRemoveRepo}
            repo={repo}
          />
        )}
      </Container>
    </>
  )
}

export default App;