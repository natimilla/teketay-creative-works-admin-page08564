import classes from "./SideBar.module.css";
import logo from "./Image/2kY9IJ1bNouZVKDgViMIxvFcEg0.svg";
import NavLinks from "./Image/NavLinks/NavLinks";
function SideBar() {
  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <img src={logo} className={classes.img} />
        <div className={classes.heading}>
          Teketay <span className={classes.coloring}>Creative</span> Works
        </div>
      </div>
      <div>
        <NavLinks />
      </div>
    </div>
  );
}
export default SideBar;
