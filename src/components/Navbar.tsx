import React from 'react';

export const Navbar: React.FC = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-success">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">
        Football statistics
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/leagues">
              Список лиг
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/teams">
              Список команд
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/league_calendar">
              Календарь лиги
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/team_calendar">
              Календарь команды
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
