import productsTypes from './products.types'

const INITAL_STATE = {
  products: [],
  product: {},
}

const productsReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.SET_PRODUCTS:
      return { ...state, products: action.payload }
    case productsTypes.SET_PRODUCT:
      return { ...state, product: action.payload }
    default:
      return state
  }
}

export default productsReducer
