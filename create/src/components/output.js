import React, { Component } from 'react'

const DEFAULT_TIME = 'Please fill out the form';

export default function Output(params) {

  function formSubmit(event) {
    event.preventDefault();
  }


  return (
    <div class="container">
      {params.time}
    </div>
  );
}