import React from 'react'

function TextError(props) {
  return (
    <p className='error'>{props.children}</p>
  )
}

export default TextError