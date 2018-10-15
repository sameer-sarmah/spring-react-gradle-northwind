import axios from 'axios';
import { FETCH_PRODUCTS,FETCH_COUNT } from './types';

const growingThreshold = 5;
const svcURL = 'https://cors-anywhere.herokuapp.com/services.odata.org/Northwind/Northwind.svc/Products';
let productCount;

export function fetchProducts(options) {
  let top = growingThreshold;
  let skip = 0;
  if (options.top) {
    top = options.top;
  }
  if (options.skip) {
    skip = options.skip;
  }
  const queryParams = {
    params: {
      '$format': 'json',
      '$top': top,
      '$skip': skip
    }
  };
  const request = axios.get(svcURL, queryParams);

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: data.data.value
      });
    });
  };
}



export function fetchCount(options) {

  const request = axios.get(svcURL+'/$count');

  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: FETCH_COUNT,
        payload: data.data
      });
    });
  };
}