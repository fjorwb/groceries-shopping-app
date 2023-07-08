export default function updateProductMockPrices(dataProductMock, dataProducts) {
  for (let i = 0; i < dataProductMock?.length; i++) {
    for (let j = 0; j < dataProducts?.length; j++) {
      if (dataProductMock[i].idext === dataProducts[j].extid) {
        dataProductMock[i].price = dataProducts[j].price
        // console.log(dataProductMock[i].name, dataProductMock[i].price)
      }
    }
  }
}
