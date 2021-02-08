import React from 'react';

type LeagueListProps = {
  competitions: any[];
};

export const LeagueList: React.FC<LeagueListProps> = ({ competitions }) => {
  return (
    <ul>
      {competitions.map((competition) => {
        return (
          <li className="league">
            <label htmlFor="">
              <input type="text" />
              <span></span>
              <i className="material-icons red-text"></i>
            </label>
          </li>
        );
      })}
    </ul>
  );
};
