import './App.css';
import { Router } from 'react-router-dom';
import Routes from './Routes';
import './ApiService/twitchWs';
import browserHistory from './history';

function App() {
  return (
    <Router history={browserHistory}>
      <Routes />
    </Router>
  );
}

export default App;
