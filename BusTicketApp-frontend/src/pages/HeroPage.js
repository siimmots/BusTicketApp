import React from 'react';
import FetchSearchBarData from '../api/FetchSearchBarData';

export default function HeroPage() {
  return (
    <React.Fragment>
      <title>BusTicketApp</title>
      <div className="hero-container">
        <div className="hero-wrapper">
          <div className="header-container">
            <div className="heading-wrapper">
              <div className="logo">BusTicketApp</div>
            </div>
          </div>
          <FetchSearchBarData params={null} /> {/* rename pls */}
        </div>
      </div>
    </React.Fragment>
  );
}
