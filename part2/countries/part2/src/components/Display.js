import React, {useState, useEffect} from "react";
import axios from 'axios'

import Country from "./Country";

const Display = ({filter, handleClick}) =>{
    const [countries, setCountries] = useState([])

    useEffect( () => {
        console.log('contacting restcountries...');
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response =>{
                console.log('promise fulfilled!');
                setCountries(response.data)
            })
    },[] )
    console.log('rendering', countries.length, 'countries');
    console.log('countries:', countries);

    const shownCountries = 
        filter === ''
        ? countries.filter((country) => country.name.common === '')
        : countries.filter((country) =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
            );

        console.log('search filter:', shownCountries);    

    return(
        <div>
            {shownCountries.length>10
                ?   'Too many countries, specify another filter.'
                :   (
                        shownCountries.map(country =>(
                            <Country key={country.name.common} country={country} length={shownCountries.length} handleClick={handleClick}/>

                )))}
        </div>
    )
}

export default Display
