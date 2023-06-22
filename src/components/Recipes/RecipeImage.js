import React, { lazy } from 'react'

import PropTypes from 'prop-types'

const RecipeImage = ({ image }) => {
  return (
    <div className='recipe-view-img-container'>
      <img src={`${image}`} alt='recipe image' className='recipe-view-img' />
    </div>
  )
}

RecipeImage.propTypes = {
  image: PropTypes.string.isRequired
}

export default RecipeImage
