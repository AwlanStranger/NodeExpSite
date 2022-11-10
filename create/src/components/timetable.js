import React, { Component } from 'react'

const DEFAULT_TIME = 'Please fill out the form';

export default function Timetable(params) {

  return (
    <div class="container">
      Latitude: {params.lat}<br/>
      Longitude: {params.long}
    </div>
  );
}