import { auth } from './../../firebase/utils'
import { put, call, all, takeLatest } from 'redux-saga/effects'
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
} from './products.helpers'
import productsTypes from './products.types'
import { setProducts, fetchProductsStart } from './products.actions'

// Add product to store
export function* addProduct({
  payload: {
    productCategory,
    productName,
    productPrice,
    productThumbnail,
    productDesc,
  },
}) {
  try {
    const timestamp = new Date()
    yield handleAddProduct({
      productCategory,
      productDesc,
      productName,
      productPrice,
      productThumbnail,
      productAdminUserUID: auth.currentUser.uid,
      createdAt: timestamp,
    })
    yield put(fetchProductsStart())
  } catch (err) {
    console.log(err)
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts({ payload: { filterType } }) {
  try {
    const products = yield handleFetchProducts({ filterType })
    yield put(setProducts(products))
  } catch (err) {
    console.log(err)
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload)
    yield put(fetchProductsStart())
  } catch (err) {
    console.log(err)
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
  ])
}
