import React from 'react'

function ProductCleanSearchButton() {
  const handleCleanSearch = (e) => {
    e.preventDefault()
    console.log('clean')
  }

  return (
    <div>
      <button onClick={handleCleanSearch}>clean</button>
    </div>
  )
}

export default ProductCleanSearchButton
