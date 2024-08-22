import classes from './Loading.module.css'
import loading from './Spinner.svg';
function Loading(){
    return <div className={classes.container}>
        <div className={classes.heading}>
            <div><img src={loading}/></div>
            <div>Loading ....</div>
        </div>
    </div>
}
export default Loading