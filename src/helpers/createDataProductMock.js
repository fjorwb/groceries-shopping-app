import deleteProductMock from '../services/productmocks/deleteProductMock'
import addProductMock from '../services/productmocks/addProductMock'
// import getProductMock from '../services/productmocks/getProductMock'

export const createDataProductMock = async ({
  url,
  token,
  user_id,
  productMockArray,
  setDataProductMock
}) => {
  const data = []

  if (productMockArray.length > 0) {
    deleteProductMock({ url, token })

    // console.log('SP productMockArray', productMockArray)

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
    setDataProductMock(() => data)
    return data
  } else {
    return []
  }
  // console.log('DATA INSIDE createDataProductMock', data)
}

export default createDataProductMock
