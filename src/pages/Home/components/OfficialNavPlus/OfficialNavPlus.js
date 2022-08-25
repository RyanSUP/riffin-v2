// Components / hooks
import LinkArea from './LinkArea'
import TagArea from './TagArea'

const navStyle = {
  margin: 5
}

function OfficialNavPlus() {
  return (
    <div style={ navStyle }>
      <LinkArea />
      <TagArea />
    </div>
  )
}

export default OfficialNavPlus