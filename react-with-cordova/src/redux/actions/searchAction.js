import Axios from "axios";
import constants from '../../constants/Constants';
import axiosConfig from '../../helper/axiosConfig';

export const search = (value) => (
  async (dispatch) => {
    try {
      const response = await  Axios.post(constants.URI.PRODUCT.SEARCH_PRODUCT_NAME, value, axiosConfig);
      dispatch(searchProductSuccess(response.data));
    } catch (e) {
      dispatch(searchProductFail(e))
    }
  }
);
const searchProductSuccess = (data) => ({
  type: constants.ACTION_TYPE.PRODUCT.SEARCH_PRODUCT_SUCCESS,
  payload: data
});
const searchProductFail = (err) => ({
  type: constants.ACTION_TYPE.PRODUCT.SEARCH_PRODUCT_FAIL,
  payload: err
});

export const searchProductOfBranch = (productAndLocation) => (
  async (dispatch) => {
    try {
      const response = await Axios.post(constants.URI.PRODUCT.SEARCH_PRODUCT_OF_BRANCH, productAndLocation, axiosConfig);
      return dispatch(searchProductOfBranchSuccess(response.data));
    } catch (e) {
      return dispatch(searchProductOfBranchFail(e));
    }
  }
);

const searchProductOfBranchSuccess = (data) => ({
  type: constants.ACTION_TYPE.PRODUCT.SEARCH_PRODUCT_OF_BRANCH_SUCCESS,
  payload: data
});

const searchProductOfBranchFail = (e) => ({
  type: constants.ACTION_TYPE.PRODUCT.SEARCH_PRODUCT_OF_BRANCH_FAIL,
  payload: e
});
export const setBranch = (branch) => ({
  type: constants.ACTION_TYPE.PRODUCT.SET_BRANCH,
  payload: branch
});