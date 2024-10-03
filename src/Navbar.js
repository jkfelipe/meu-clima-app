import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
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
  );
}
