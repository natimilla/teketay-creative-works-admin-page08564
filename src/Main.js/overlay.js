import Loading from './Loading';
import classes from './overlay.module.css';
import { useSelector } from "react-redux";
import Submit from './submit';
import Error from './Error';
function Overlay(){
    const loading=useSelector(state=>state.display.loading);
  const submitted=useSelector(state=>state.display.submitted);
  const error=useSelector(state=>state.display.error);
  const display=loading||submitted||error
    return <div className={classes.container}>
        {loading && <Loading/>}
        {submitted &&<Submit/>}
        {error &&  <Error/>}
    </div>
    
}
export default Overlay;