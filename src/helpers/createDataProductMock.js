import { useState } from 'react'

import deleteProductMock from '../services/productmocks/deleteProductMock'
import addProductMock from '../services/productmocks/addProductMock'
// import getProductMock from '../services/productmocks/getProductMock'

export const createDataProductMock = async ({ url, token, user_id, productMockArray }) => {
  const [dataProd, setDataProd] = useState([])
  const data = []

  deleteProductMock({ url, token })

  console.log('PRODUCT<MOCK', productMockArray)

  const dataprd = [...productMockArray]
  console.log('SP productMockArray', dataprd)

  for (const item in dataprd) {
    const inputAddProduct = {
      idext: dataprd[item].extid,
      amount: dataprd[item].amount,
      name: dataprd[item].shop_list_id,
      market_id: dataprd[item].id,
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

    // console.log(inputAddProduct.name)

    data.push(inputAddProduct)
  }
  setDataProd(() => data)
  console.log('DATA PRODUCT MOCK', dataProd)
  return dataProd
}

export default createDataProductMock
