const Bar = ( {index, bar, handleClickedBar, setBarInTablature} ) => {
    
    const callHandleClickedBar = (event) => console.log('callHandleClickedBar', event)
    const callSetBarInTablature = (event) => console.log('callSetBarInTablature', event)
    
    return (
        <>
            I'm a bar
        </>
    );
}
 
export default Bar;