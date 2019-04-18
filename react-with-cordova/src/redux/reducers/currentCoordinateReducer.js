import Constants from '../../constants/Constants';

const initialState = {
  currentCoordinate: {}
};
const {SET_CURRENT_COORDINATE} = Constants.ACTION_TYPE.CURRENT_COORDINATE;
export default (state = initialState, {type, payload}) => {
  switch (type) {

    case SET_CURRENT_COORDINATE:
      return {...state, currentCoordinate: payload};

    default:
      return state
  }
}
