import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CountryView from './CountryView';

const Country = ({ country, length, handleClick }) => {
  const api_key = process.env.REACT_APP_API_KEY;

  const [show, setShow] = useState(false); // Use state to toggle the show/hide of CountryView

  const clickToShow = show ? (
    <div key={country.name.common}>
      {country.name.common}
      <button onClick={() => setShow(false)}>hide</button> {/* Added hide button */}
      <button onClick={handleClick} id={country.name.common}>
        show
      </button>
    </div>
  ) : (
    <CountryView country={country} id={country.name.common} />
  );

  return length === 1 ? (
    <CountryView country={country} />
  ) : (
    clickToShow
  );
};

export default Country;
