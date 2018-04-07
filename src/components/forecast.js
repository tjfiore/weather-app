import React, { Component } from 'react';
import TiThermometer from "react-icons/lib/ti/thermometer";
import TiWeatherWindy from "react-icons/lib/ti/weather-windy";
import TiWeatherShower from "react-icons/lib/ti/weather-shower";

import { withStyles } from 'material-ui/styles';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";

import DarkSkyApi from 'dark-sky-api';

// import swal from "sweetalert2";

DarkSkyApi.apiKey = 'af1530eee59ce29b15ef8e96c88383e1';
const responseUnits = DarkSkyApi.getResponseUnits();

const styles = theme => ({
  root: theme.mixins.gutters({
    padding: 10,
    margin: theme.spacing.unit * 3,
    backgroundColor: '#5C6AC4',
    color: 'white',
  }),
  grid:{
    marginBottom: 100,
  },
  grid2:{
    marginBottom: 100,
  },
  timeText:{
    textAlign: 'center', 
  },
  summaryText:{
    textAlign: 'center', 
    fontSize: 30,
    marginBottom: 30,
  }
  

});

class Forecast extends Component {
  state = {
    time: null,
    summary: '',
    temp: 0,
    apparentTemp: 0,
    precipIntensity: 0, 
    precipProbability: 0,
    precipType: 'Rain',
    windSpeed: 0,
    windDirection: '',
    humidity: 0,
    dewPoint: 0,
    pressure: 0,
    cloudCover: 0,
    windGust: 0,
    ozone: 0,
    visibility: 0,
    uvIndex: 0
  }

  componentDidMount() {
    DarkSkyApi.loadCurrent()
    .then(result => { 
      this.setState({
        time: new Date(result.time * 1000).toLocaleTimeString('ll'),
        summary: result.summary,
        temp: result.temperature,
        apparentTemp: result.apparentTemperature,
        precipIntensity: result.precipIntensity,
        precipProbability: result.precipProbability,
        precipType: result.precipType,
        windSpeed: result.windSpeed,
        windDirection: result.windDirection,
        humidity: result.humidity,
        dewPoint: result.dewPoint,
        pressure: result.pressure,
        cloudCover: result.cloudCover,
        windGust: result.windGust,
        ozone: result.ozone,
        visibility: result.visibility,
        uvIndex: result.uvIndex,
      });
    });
      
      
  }


  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>                   
          <p className={classes.timeText}>{this.state.time}</p>          
          <p className={classes.summaryText}>{this.state.summary}</p>

          <Grid container  className={classes.grid} justify="center" alignItems="center" spacing={0}>
            <Grid item xs>
              <Grid container spacing={0}>
                <Grid item xs={3}>
                  <TiThermometer size={90}/> 
                  <span style={{ marginLeft: 20 }}>Temp</span> 
                </Grid>
                <Grid item xs>             
                  <span style={{fontSize:25}}>{this.state.temp} degrees {responseUnits.temperature}</span> 
                  <br />
                  <span>Temperature</span> 
                  <br/> <br/>
                  <span style={{ fontSize: 20 }}>{this.state.apparentTemp} degrees {responseUnits.apparentTemperature}</span> 
                  <br />
                  <span>Feels Like</span> 
                </Grid>   
              </Grid>            
            </Grid>
            <Grid item xs>
               <Grid container spacing={0}>
                <Grid item xs={3}>
                  <TiWeatherShower size={90}/> 
                  <span style={{ marginLeft: 20 }}>{this.state.precipType.charAt(0).toUpperCase() + this.state.precipType.slice(1).toLowerCase()}</span> 
                </Grid>
                <Grid item xs>             
                  <span style={{fontSize:25}}>{this.state.precipIntensity} {responseUnits.precipIntensity}</span> 
                  <br/> <br/>
                  <span style={{ fontSize: 20 }}>{this.state.precipProbability}</span>
                  <br />
                  <span>Probability</span> 
                </Grid>   
              </Grid>   
            </Grid>
            <Grid item xs>
               <Grid container spacing={0}>
                <Grid item xs={3}>
                  <TiWeatherWindy size={90}/> 
                  <span style={{ marginLeft: 20 }}>Wind</span> 
                </Grid>
                <Grid item xs>             
                  <span style={{ fontSize: 25 }}>{this.state.windSpeed} {responseUnits.windSpeed}</span> 
                  <br/><br/> 
                  <span style={{ fontSize: 20 }}>{this.state.windDirection}</span>
                  <br />
                  {
                    this.state.windDirection === 'N' ? <span>North</span> :
                    this.state.windDirection === 'S' ? <span>South</span> : 
                    this.state.windDirection === 'E' ? <span>East</span> : 
                    this.state.windDirection === 'W' ? <span>West</span> : 
                    this.state.windDirection === 'NE' ? <span>North East</span> : 
                    this.state.windDirection === 'NW' ? <span>North West</span> :                     
                    this.state.windDirection === 'SE' ? <span>South East</span> : 
                    this.state.windDirection === 'SW' ? <span>South West</span>: null 
                  }
                </Grid>   
              </Grid>       
            </Grid>
          </Grid>
          
          <Grid container className={classes.grid2} justify="center" alignItems="center" spacing={0}>
            <Grid item xs>
              <p>Humidity</p>
              <span>{this.state.humidity}</span>
            </Grid>
            <Grid item xs>
              <p>Dew Point</p>
              <span>{this.state.dewPoint} {responseUnits.dewPoint}</span>
            </Grid>
            <Grid item xs>
              <p>Pressure</p>
              <span>{this.state.pressure} {responseUnits.pressure}</span>
            </Grid>
            <Grid item xs>
              <p>Cloud Cover</p>
              <span>{this.state.cloudCover}</span>
            </Grid>
            <Grid item xs>
              <p>Wind Gust</p>
              <span>{this.state.windGust}</span>
            </Grid>
            <Grid item xs>
              <p>Ozone</p>
              <span>{this.state.ozone}</span>
            </Grid>
            <Grid item xs>
              <p>Visibility</p>
              <span>{this.state.visibility} {responseUnits.visibility}</span>
            </Grid>
            <Grid item xs>
              <p>UV Index</p>
              <span>{this.state.uvIndex}</span>
            </Grid>            
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Forecast);