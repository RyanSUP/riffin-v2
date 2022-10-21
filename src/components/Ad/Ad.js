import adImage from '../../assets/images/fake_ad.png'

const Ad = () => {
  return (
    <a target="_blank" rel="noreferrer" href={'https://www.linkedin.com/in/ryanmorici/'}>
      <img src={adImage} alt="advertisement" style={{maxWidth: "160px"}}/>
    </a>
  );
}
 
export default Ad;