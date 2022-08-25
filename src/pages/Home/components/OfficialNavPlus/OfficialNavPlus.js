import React from 'react'
import LinkArea from './LinkArea'
import TagArea from './TagArea'

function OfficialNavPlus() {
  const navStyle = {
    margin: 5
  }

  return (
    <div style={ navStyle }>
      <LinkArea />
      <TagArea />
    </div>
  )
}

export default OfficialNavPlus