

import Home from "./Home";
import classes from "./Main.module.css";
import Stairs from "./stairs";
import WallArts from "./WallArts";

function Main() {
  
  return <div className={classes.container}>
    <Home/>
    <WallArts/>
    <Stairs/>
  </div>
}
export default Main;
