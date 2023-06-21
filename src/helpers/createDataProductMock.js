import deleteProductMock from '../services/deleteProductMock'
import addProductMock from '../services/addProductMock'

export function createDataProductMock({ url, token, productMockArray, user_id }) {
  deleteProductMock({ url, token })

  for (const item in productMockArray) {
    const inputAddProduct = {
      idext: productMockArray[item].extid,
      amount: productMockArray[item].amount,
      name: productMockArray[item].shop_list_id,
      market_id: productMockArray[item].id,
      barcode: 'XOXO',
      presentation: 'mock',
      unit: 'mock',
      user_id
    }

    addProductMock({
      url,
      token,
      inputAddProduct
    })
  }
}

export default createDataProductMock
