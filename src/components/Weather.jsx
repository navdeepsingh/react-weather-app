import React, {useState, useEffect} from 'react'

export default function Weather() {
  const [state, setState] = useState(null)
  const [status, setStatus] = useState({loading: true, error: null})
  const API_URL =
    'http://api.weatherapi.com/v1/forecast.json?key=698dc13c77094cf187695058201212&q=London&days=1'

  // On page mounting fetch the data
  // store in local state
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(
        data => {
          setState(data)
          setStatus({
            loading: false,
          })
        },
        error => {
          setStatus({
            loading: false,
            error,
          })
        },
      )
  }, [])

  const renderCurrentData = () => {
    if (state !== null) {
      const {current} = state
      const newCurrentData = Object.keys(current).filter(e => e !== 'condition')
      return newCurrentData.map((key, index) => {
        return (
          <div className="record" key={index}>
            <label>{key}</label>
            <div>{current[key]}</div>
          </div>
        )
      })
    }
  }

  const renderForecastData = () => {
    if (state !== null) {
      const {
        forecast: {forecastday},
      } = state
      const {hour} = forecastday[0]
      return hour.map(item => {
        return (
          <div className="record" key={item.time_epoch}>
            <label>{item.time}</label>
            <div></div>
          </div>
        )
        // const newCurrentData = Object.keys(item).filter(e => e !== 'condition')
        // return newCurrentData.map((key, index) => {
        //   // return (
        //   //   <div className="record" key={index}>
        //   //     <label>{key}</label>
        //   //     <div>{current[key]}</div>
        //   //   </div>
        //   // )
        // })
      })
    }
  }

  return (
    <div>
      {status.loading ? (
        'Loading...'
      ) : (
        <>
          <header className="header">
            <h1>
              {state.location.name}, {state.location.country}
            </h1>
            <div className="header__temp">
              {state.current.temp_c}
              <sup>&deg;</sup>
              <small>C</small>
            </div>
            <div>
              <small>Localtime: {state.location.localtime}</small>
            </div>
          </header>
          <div className="wrapper">
            <div>
              <h2>Current Forecast</h2>
              <div className="current-data data">{renderCurrentData()}</div>
            </div>
            {/* 24 Hours Forecast */}
            <div>
              <h2>24 hours Forecast</h2>
              <div className="forecast-data data">{renderForecastData()}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
