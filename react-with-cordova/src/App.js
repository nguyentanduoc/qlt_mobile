import React, {Component} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import SearchComponent from './components/search/SearchComponent';
import 'antd/dist/antd.css'
import {connect} from "react-redux";
import {setCurrentCoordinate} from './redux/actions/currentCoordinateAction'
import MapComponent from "./components/map/MapComponent";
import PropTypes from "prop-types";
import currentCoordinateReducer from "./redux/reducers/currentCoordinateReducer";

class App extends Component {
  static propTypes = {
    coords: PropTypes.object
  };
  componentWillMount() {
    const {currentCoordinate} = this.props.currentCoordinateReducer;
    if(!currentCoordinate.latitude && !currentCoordinate.longitude){
      this.props.onSetCurrentCoordinate({
        latitude: this.props.coords.latitude,
        longitude: this.props.coords.longitude,
      });
    }
  }

  render() {
    console.log(this.props.currentCoordinateReducer);
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/map" name="Bản đồ" component={MapComponent}/>
          <Route exact path="/" name="Tìm" component={SearchComponent}/>
        </Switch>
      </HashRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchReducer: state.searchReducer,
    currentCoordinateReducer: state.currentCoordinateReducer
  };
}

const dispatchToProps = (dispatch) => ({
  onSetCurrentCoordinate: (coordinate) => dispatch(setCurrentCoordinate(coordinate))
});

export default connect(
  mapStateToProps, dispatchToProps
)(App);
