import React, { Component } from 'react';
import axios from 'axios';
import {useState, useEffect} from "react"


// import { render } from 'react-dom'

const DEFAULT_TIME = '---';

export default function Output(props) {

  const [state, setState] = useState({
    fajr: DEFAULT_TIME,
    dhuhr: DEFAULT_TIME,
    asr: DEFAULT_TIME,
    maghrib: DEFAULT_TIME,
    isha: DEFAULT_TIME,
  })

  async function getPrayerTime(prayer, lat, long) {
    try {
      const response = await axios.get(
        "http://localhost:3001/prayer",
        {
            params: {
              prayer: prayer,
              latitude: lat,
              longitude: long
            }
        }
      )
      return response.data;
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function makeApiCall() {
      const fajr = await getPrayerTime("fajr", props.lat, props.long);
      const dhuhr = await getPrayerTime("dhuhr", props.lat, props.long);
      const asr = await getPrayerTime("asr", props.lat, props.long);
      const maghrib = await getPrayerTime("maghrib", props.lat, props.long);
      const isha = await getPrayerTime("isha", props.lat, props.long);
      setState((oldState) => {
        return {
            ...oldState,
            fajr: fajr,
            dhuhr: dhuhr,
            asr: asr,
            maghrib: maghrib,
            isha: isha,
        }
      });
    }
    makeApiCall();
  }, [props.lat, props.long])

  return (
  <div class="container">
    Lat: {props.lat}<br/>
    Long: {props.long}<br/>

    
    <h1>When Do You Pray?</h1>

    <div align="center">

      <table>
        <tr>
          <th>Prayer</th>
          <th>Time</th>
        </tr>

        <tr>
          <td>Fajr</td>
          <td>{state.fajr}</td>
        </tr>

        <tr>
          <td>Dhuhr</td>
          <td>{state.dhuhr}</td>
        </tr>

        <tr>
          <td>Asr</td>
          <td>{state.asr}</td>
        </tr>

        <tr>
          <td>Maghrib</td>
          <td>{state.maghrib}</td>
        </tr>

        <tr>
          <td>Isha</td>
          <td>{state.isha}</td>
        </tr>
        
      </table>
    </div>
  </div>
);
}