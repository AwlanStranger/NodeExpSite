import React, { Component } from 'react'
// import { render } from 'react-dom'

const DEFAULT_TIME = 'Please fill out the form';

export default function Output(params) {

  // const [state, setState] = useState({
  //     // Setting default values for state variables
  //     time: DEFAULT_TIME
  // })

  function formSubmit(event) {
      event.preventDefault();
  }


  return (
  <div class="container">
    Lat: {params.lat}<br/>
    Long: {params.long}<br/>
  </div>
);
}