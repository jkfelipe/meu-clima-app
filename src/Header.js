import React, { useState, useContext } from 'react';
import SearchContext from './SearchContext'; // Importe o context
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

export default function Header() {

  const [pesquisa, setPesquisa] = useState({
    searchQuery: '',
    showSearchQuery: false, // Novo estado para controlar a visibilidade
  });

  const { setSearchQuery } = useContext(SearchContext); // Use useContext para obter a função setSearchQuery

  function handleSearchQueryChange(e) {
    setPesquisa({
      ...pesquisa,
      searchQuery: e.target.value,
      showSearchQuery: false,
    });
  }

  function handleSearchClick() {
    
    setPesquisa({
      ...pesquisa,
      showSearchQuery: true, // Mostrar a consulta de pesquisa
    });

    setSearchQuery(pesquisa.searchQuery); // Atualize o valor do searchQuery no context

  }

  return (
    <header className="pb-3 mb-4 border-bottom">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <h4>
                  <img src="./cloud-haze2-fill.svg" alt="Logo" width="50" height="44" className="d-inline-block align-text-top" />
                  OpenWeather API
                </h4>
              </a>
            </div>
          </div>
          <div className="col-md-auto">{/* Div para ajustar o lyout */}</div>
          <div className="col col-lg-4 text-center">
            <div className="input-group mb-3">
              <input className="form-control" 
                placeholder="Entre a cidade, estado, país" 
                value={pesquisa.searchQuery} 
                onChange={handleSearchQueryChange} 
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearchClick();
                  }
                }} 
              />
              <button className="btn btn-dark" type="button" onClick={handleSearchClick}>Pesquisar</button>
            </div>
          </div>
        </div>
        {/* <Navbar /> */}
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <Link className='nav-link' to="/">Home</Link>
                <Link className='nav-link' to="/weather">Weather</Link>
                <Link className='nav-link' to="/forecast">Forecast</Link>
                <Link className='nav-link' to="/teste">Teste</Link>
              </div>
              </div>
            </div>
        </nav>  
      </div>
    </header>
  );
}