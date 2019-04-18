import React, {Component} from 'react';
import {connect} from 'react-redux';
import mapboxgl from "mapbox-gl";
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {Affix, Button} from "antd";

const token = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
mapboxgl.accessToken = token;

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      directions: {},
      map: {}
    }
  }

  componentWillMount() {
    const currentCoordinateReducer = this.props.currentCoordinateReducer;
    const searchReducer = this.props.searchReducer;
    if (!searchReducer.branch.id) {
      this.props.history.push("/");
    } else {
      const directions = new Directions({
        accessToken: token,
        unit: 'metric',
        profile: 'mapbox/driving-traffic',
        congestion: true,
      });
      directions.setOrigin([currentCoordinateReducer.currentCoordinate.longitude, currentCoordinateReducer.currentCoordinate.latitude]);
      directions.setDestination([searchReducer.branch.longitude, searchReducer.branch.latitude]);
      this.setState({directions: directions});
    }
  }

  componentDidMount = async () => {
    const map = await new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [106.63503660, 10.85268900],
      zoom: 14,
    });
    map.on('move', () => {
      const {lng, lat} = map.getCenter();
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    await map.addControl(this.state.directions, 'top-left');
    this.setState({map: map});
  };

  backSearch = () => {
    this.props.history.push("/");
  };

  componentWillUnmount() {
    if (Object.keys(this.state.map).length) {
      this.state.map.remove();
    }
  }

  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className={'map-controller'}
             style={{
               position: 'absolute',
               top: 0,
               bottom: 0,
               width: '100%',
               height: '100%',
             }}>
          <Affix target={() => this.container} style={{position: 'absolute', top: 10, right: 3, zIndex: 200}}>
            <Button type="primary" icon={'left'} onClick={this.backSearch}/>
          </Affix>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchReducer: state.searchReducer,
    currentCoordinateReducer: state.currentCoordinateReducer
  };
}

export default connect(
  mapStateToProps,
)(MapComponent);