import React from 'react';

export const Navbar: React.FC = () => (
  <nav>
    <div className="nav-wrapper green accent-4 px1">
      <a href="/" className="brand-logo">
        Football statistics
      </a>
      <ul className="right hide-on-med-and-down">
        <li>
          <a href="/">Список лиг</a>
        </li>
        <li>
          <a href="/">Список команд</a>
        </li>
        <li>
          <a href="/">Календарь лиги</a>
        </li>
        <li>
          <a href="/">Календарь одной команды</a>
        </li>
      </ul>
    </div>
  </nav>
);
