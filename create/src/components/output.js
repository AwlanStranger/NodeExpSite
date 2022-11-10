import React, { Component } from 'react'

const DEFAULT_TIME = 'Please fill out the form';

export default function Output(params) {

  return (
    <div class="container">
      {params.time}
    </div>
  );
}