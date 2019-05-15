import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactMapboxGl from "react-mapbox-gl";
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {Affix, Button} from "antd";

const token = "pk.eyJ1IjoibnRkdW9jIiwiYSI6ImNqdWNpZGEyZTBtZ2E0ZXFxemw4ZXhvNGYifQ.LwX-4Db561hcAVS4WTiNzA";
const Map = ReactMapboxGl({
  accessToken: token
});

class MapComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      directions: {},
      map: {}
    }
  }

  componentWillMount() {
    const searchReducer = this.props.searchReducer;
    if (!searchReducer.branch.id) {
      this.props.history.push("/");
    }
  }

  backSearch = () => {
    this.props.history.push("/");
  };

  componentWillUnmount() {
    if (Object.keys(this.state.map).length) {
      this.state.map.remove();
    }
  }

  onStyleLoad = (map) => {
    const {currentCoordinate} = this.props.currentCoordinateReducer;
    const {branch} = this.props.searchReducer;
    const directions = new Directions({
      accessToken: token,
      unit: 'metric',
      profile: 'mapbox/walking',
      congestion: true,
    });
    directions.setOrigin([currentCoordinate.longitude, currentCoordinate.latitude]);
    directions.setDestination([branch.longitude, branch.latitude]);
    map.addControl(directions, 'top-left');
  };

  render() {
    const {currentCoordinate} = this.props.currentCoordinateReducer;
    return (
      <div style={{width: "100%", height: "100%"}}>
        {
          currentCoordinate && currentCoordinate.longitude && currentCoordinate.latitude &&
          <Map
            style="mapbox://styles/mapbox/streets-v8"
            containerStyle={{
              height: "100vh",
              width: "100vw"
            }}
            center ={[currentCoordinate.longitude, currentCoordinate.latitude]}
            onStyleLoad={this.onStyleLoad}
          />
        }
        <Affix target={() => this.container} style={{position: 'absolute', top: 10, right: 3, zIndex: 200}}>
          <Button type="primary" icon={'left'} onClick={this.backSearch}/>
        </Affix>
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