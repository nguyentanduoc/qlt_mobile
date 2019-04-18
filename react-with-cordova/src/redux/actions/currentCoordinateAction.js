import Constants from '../../constants/Constants';

export const setCurrentCoordinate = (coordinate) => ({
  type: Constants.ACTION_TYPE.CURRENT_COORDINATE.SET_CURRENT_COORDINATE,
  payload: coordinate
});