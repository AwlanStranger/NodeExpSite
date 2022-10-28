import React, { Component } from 'react'
// import { render } from 'react-dom'

export default function Output(params) {

  // const [state, setState] = useState({
  //     // Setting default values for state variables
  //     // time: DEFAULT_TIME
  // })

  function formSubmit(event) {
      event.preventDefault();
  }


  return (
  <div class="container">
    {params.time}
  </div>
);
}