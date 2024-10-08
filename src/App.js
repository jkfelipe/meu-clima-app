import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Weather from './Weather';
import Forecast from './Forecast';
import Home from './Home';
import Teste from './Teste';

//Importação do bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'

function App() {
  return (
    <Router>
      <div class="container py-4">
        <Routes>
          <Route path="/teste" element={<Teste />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

/*import React from 'react';
import Weather from './Weather';

function App() {
  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;
*/