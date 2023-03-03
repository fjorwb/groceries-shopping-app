import deleteProductMock from '../services/deleteProductMock'
import addProductMock from '../services/addProductMock'

export function createDataProductMock({ url, token, arrZZZ, user_id }) {
  deleteProductMock({ url, token })

  for (const item in arrZZZ) {
    const inputAddProduct = {
      idext: arrZZZ[item].extid,
      amount: arrZZZ[item].amount,
      name: arrZZZ[item].shop_list_id,
      market_id: arrZZZ[item].id,
      barcode: 'XOXO',
      presentation: 'mock',
      unit: 'mock',
      user_id: user_id
    }
    addProductMock({
      url,
      token,
      inputAddProduct
    })
  }
}

export default createDataProductMock
