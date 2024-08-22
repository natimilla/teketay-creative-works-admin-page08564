import { useDispatch } from 'react-redux';
import classes from './Error.module.css';
import { displayActions } from '../Store/Display';
function Submit(){
    const dispatch=useDispatch();
    const submitHandler=()=>{
        dispatch(displayActions.submittedHandler())
    }
    return <div className={classes.container}>
        <div className={classes.heading}>Successfully Submitted !</div>
        <div className={classes.buttonContainer}><button className={classes.button} onClick={submitHandler}> OK </button></div>
    </div>
}
export default Submit;