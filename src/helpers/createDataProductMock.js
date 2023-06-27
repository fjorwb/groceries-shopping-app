import deleteProductMock from '../services/productmocks/deleteProductMock'
import addProductMock from '../services/productmocks/addProductMock'
// import getProductMock from '../services/productmocks/getProductMock'

export const createDataProductMock = async ({
  url,
  token,
  productMockArray,
  user_id,
  setDataProductMock
}) => {
  const data = []
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

  // try {
  //   const data = await getProductMock({ url, token })
  //   setDataProductMock(() => data)
  // } catch (error) {
  //   console.log(error)
  // }
  // setDataProductMock(() => data)
  // return data
}

export default createDataProductMock
