import React, { Component } from 'react'
// import { render } from 'react-dom'

const DEFAULT_TIME = "not a time"

export default function Output(time) {

  // const [state, setState] = useState({
  //     // Setting default values for state variables
  //     // time: DEFAULT_TIME
  // })

  function formSubmit(event) {
      event.preventDefault();
  }


  return (
  <div class="container">
    {time}
  </div>
);
}