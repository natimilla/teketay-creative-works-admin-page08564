import { useDispatch } from 'react-redux';
import classes from './Error.module.css';
import { displayActions } from '../Store/Display';
function Error(){
    const dispatch=useDispatch();
    const errorHandler=()=>{
        dispatch(displayActions.errorHandler())
    }
    return <div className={classes.container}>
        <div className={classes.heading}>Oops something goes wrong</div>
        <div className={classes.buttonContainer}><button className={classes.button} onClick={errorHandler}> OK </button></div>
    </div>
}
export default Error;