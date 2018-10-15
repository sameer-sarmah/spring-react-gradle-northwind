import odata from 'odata';
import { FETCH_PRODUCTS,FETCH_COUNT } from './../actions/types';
import axios from 'axios';

const growingThreshold = 5;
const svcURL = 'Products';


export function fetchProducts(options) {
  let top = growingThreshold;
  let skip = 0;
  if (options.top) {
    top = options.top;
  }
  if (options.skip) {
    skip = options.skip;
  }
  odata().config({
    format: 'json', 	
    endpoint:'/',
    autoFormat: false, 
    version: 4, 
    headers: [{'Accept':'application/json'}]
  });

  const url=odata(svcURL).top(top).skip(skip).query();
  const request = axios.get(url);
  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: data.data.value
      });
    });
  };
}



export function fetchCount() {
  odata().config({
    endpoint:'/',
    autoFormat: false, 
    version: 4, 
    headers: [{'Accept':'application/json'}]
  });  

  const url=odata(svcURL).count().query();
  const request = axios.get(url);
  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: FETCH_COUNT,
        payload: data.data
      });
    });
  };
}