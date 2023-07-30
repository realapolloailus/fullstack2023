import React from 'react'



const CountryView = ({country}) => {
    console.log('country:', country);

    const languagesArray = Object.entries(country.languages).map(([code, name]) => ({
        code,
        name,
    }));
    console.log('flag:', country.flag);
    return(
        <div>
            <h2> {country.name.common} </h2>
            <p> capital: {country.capital} </p>
            <p> area: {country.area} </p>
            <h3>languages:</h3>
            <ul>
                {languagesArray.map( (language, id) => (
                    <li key={id}> {language.name} </li>
                ))}
                
            </ul>
            <h3>Flag of {country.name.common}:</h3>
            <span className="flag-emoji" role="img" aria-label={`Flag of ${country.name.common}`}>
                {country.flag}
            </span>
            
            
        </div>
    )
}
export default CountryView
