const productsTypes = {
  ADD_NEW_PRODUCT_START: 'ADD_NEW_PRODUCT_START',
  FETCH_PRODUCTS_START: 'FETCH_PRODUCTS_START',
  SET_PRODUCTS: 'SET_PRODUCTS',
  DELETE_PRODUCT_START: 'DELETE_PRODUCT_START',
  FETCH_PRODUCT_START: 'FETCH_PRODUCT_START',
  SET_PRODUCT: 'SET_PRODUCT',
}

export default productsTypes

// Saga Workflow
// 1. Create fetch and set types 
// 2. Create the fetch and set actions
// 3. Create the helper function that takes async code
// 4. Create the sagas, put helper function into fetcher saga
// 5. Create the reducer, add initial state if needed, payload will be 