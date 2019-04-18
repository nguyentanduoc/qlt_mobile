import Constants from '../../constants/Constants';

const initialState = {
  products: [],
  error: {},
  branches: [],
  branch: {}
};
const {
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_OF_BRANCH_SUCCESS,
  SEARCH_PRODUCT_OF_BRANCH_FAIL,
  SET_BRANCH
} = Constants.ACTION_TYPE.PRODUCT;
export default (state = initialState, {type, payload}) => {
  switch (type) {

    case SEARCH_PRODUCT_SUCCESS:
      return {...state, products: payload};

    case SEARCH_PRODUCT_FAIL:
      return {...state, error: payload};

    case SEARCH_PRODUCT_OF_BRANCH_SUCCESS:
      return {...state, branches: payload};

    case SEARCH_PRODUCT_OF_BRANCH_FAIL:
      return {...state, error: payload};

    case SET_BRANCH:
      return {...state, branch: payload};

    default:
      return state
  }
}
