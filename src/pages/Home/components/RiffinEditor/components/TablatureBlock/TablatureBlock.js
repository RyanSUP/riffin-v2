// Components / hooks
import DashTextarea from "./components/DashTextarea/DashTextarea";
import InputTextarea from "./components/InputTextarea/InputTextarea";
import TablatureWrapper from "./components/TablatureWrapper/TablatureWrapper";
import { useContext, useRef } from "react";
import NoteTextarea from "./components/NoteTextarea/NoteTextarea";
import { RiffinEditorDispatch } from "../../RiffinProvider";
import { useDrag, useDrop } from 'react-dnd';
// MUI
import { Grid } from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';

/**
 * * TablatureBlock is a section of the screen dedicated to 1 piece of tablature. Note that a RiffinEditor document can have multiple TablatureBlocks.
 * props: index, block, numberOfStrings
 */

const TablatureBlock = (props) => {
  const { dispatch, editor } = useContext(RiffinEditorDispatch);
  const ref = useRef(null)

  const [{ handlerId }, drop] = useDrop(() => ({
    accept: "block",
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = props.index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // props.moveCard(dragIndex, hoverIndex)
      // let blocks = [...editor.tablature.blocks]
      // blocks = update(blocks, {
      //   $splice: [
      //     [dragIndex, 1],
      //     [hoverIndex, 0, blocks[dragIndex]],
      //   ],
      // })
      const action = {
        type: "order",
        dragIndex,
        hoverIndex,
      }
      dispatch(action);
      item.index = hoverIndex
    },
    collect: monitor => ({
      handlerId: monitor.getHandlerId(),
    }),
  }), [props.index])

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "block",
    item: {index: props.index},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <Grid container style={{opacity}} data-handler-id={handlerId} ref={ref} >
      <Grid container item xs={12}>
        <Grid item xs={0.3}>
        </Grid>
        <Grid item xs={11.7}>
          <NoteTextarea label={props.block.label} index={props.index}/>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={0.3} sx={{display: 'flex', justifyContent: 'flex-end', '&:hover': {
       cursor: "row-resize"}}}>
          <DragHandleIcon style={{alignSelf: 'center', opacity: '0.2'}} />
        </Grid>
        <Grid item xs={11.7}>
          <TablatureWrapper>
            <InputTextarea
              block={props.block} 
              index={props.index} 
              numberOfStrings={editor.tablature.numberOfStrings}
            />
            <DashTextarea 
              block={props.block} 
              numberOfStrings={editor.tablature.numberOfStrings}
            />
          </TablatureWrapper>
        </Grid>
      </Grid>
    </Grid>
  );
}
 
export default TablatureBlock;
