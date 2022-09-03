// Components / hooks
import LinkArea from './components/LinkArea/LinkArea'
import TagArea from './components/TagArea/TagArea'

const navStyle = {
  margin: 5
}

function OfficialNavPlus(props) {
  return (
    <div style={ navStyle } data-testid="OfficialNavPlus">
      <LinkArea />
      <TagArea 
        addTag={props.addTag}
      />
    </div>
  )
}

export default OfficialNavPlus