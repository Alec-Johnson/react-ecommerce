import productsTypes from './products.types'

const INITAL_STATE = {
  products: [],
}

const productsReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.SET_PRODUCTS:
      return { ...state, products: action.payload }
    default:
      return state
  }
}

export default productsReducer
