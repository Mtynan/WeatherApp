import React from 'react';


const Searchbox = (props) => (
    <form onSubmit={props.getWeather}>   
        <input type="text" name="city" placeholder="City"/>
        <input type="text" name="country" placeholder="Country"/>
        <button>run</button>
    </form> 
)

export default Searchbox;