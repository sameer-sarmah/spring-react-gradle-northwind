import productReducer from './../reducers/products-reducer';

describe('On dispatching FETCH_PRODUCTS action', () => {
  it('should return correct updated state', () => {
    const action = {'type':'fetch_products','payload':[{'name':'Adidas'}]}; 
    expect(typeof  productReducer === 'function').toEqual(true);
    const state=productReducer.call({}, {count:0,products:[]},action);
    expect(state.count).toEqual(0);
    expect(state.products).toEqual([{'name':'Adidas'}]);
  });
});
  