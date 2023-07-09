import deleteProductMock from '../services/productmocks/deleteProductMock'
import addProductMock from '../services/productmocks/addProductMock'

export const createDataProductMock = ({ url, token, user_id, productMockArray }) => {
  const data = []

  if (productMockArray.length > 0) {
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

      data.push(inputAddProduct)
    }
    return data
  } else {
    return []
  }
}

export default createDataProductMock
