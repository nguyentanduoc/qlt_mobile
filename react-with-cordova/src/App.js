import React, {Component} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import SearchComponent from './components/search/SearchComponent';
import 'antd/dist/antd.css'
import {connect} from "react-redux";
import {setCurrentCoordinate} from './redux/actions/currentCoordinateAction'
import MapComponent from "./components/map/MapComponent";

class App extends Component {

  componentWillMount() {
    this.getLocation();
  }

  getLocation() {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition((position) => {
        this.props.onSetCurrentCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (e) => {
        console.log(e)
      })
    }
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/map" name="Bản đồ" component={MapComponent} />
          <Route exact path="/" name="Tìm" component={SearchComponent} />
        </Switch>
      </HashRouter>
    );
  }
}
function mapStateToProps(state) {
  return {
    searchReducer: state.searchReducer
  };
}

const dispatchToProp = (dispatch) => ({
  onSetCurrentCoordinate: (coordinate) => dispatch(setCurrentCoordinate(coordinate))
});

export default connect(
  mapStateToProps, dispatchToProp
)(App);
