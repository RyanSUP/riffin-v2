import TablatureCard from "../../components/TablatureCard/TablatureCard";

const Trending = (props) => {
    return (
        <>
            {props.trendingTablature?.map( (tablatureDocument, index) => (
                <TablatureCard tablature={tablatureDocument} key={index} />
                // <>{tablatureDocument.name}</>
            ))

            }
        </>
    );
}
 
export default Trending;