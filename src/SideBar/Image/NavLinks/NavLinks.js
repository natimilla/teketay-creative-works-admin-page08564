import { NavLink } from "react-router-dom";
import classes from "./NavLink.module.css";
import menu from "./../menuIcon.svg";
import { useEffect, useState } from "react";
import cancelIcon from './../cancelIcon.svg'
function NavLinks() {
  const [display, setDisplay] = useState(false);
  const [linkDisplay,setLinkDisplay]=useState(false);
  useEffect(() => {
   function handleResize() {
      const screenWidth = window.innerWidth;
      setDisplay(screenWidth < 1000);
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function once on mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
   
  }, [window.innerWidth]);
  const linkDisplayHandler=()=>{
      setLinkDisplay(true);
  }
  const linkHiderHandler=()=>{
    setLinkDisplay(false)
  }
  const displayLink=!display||linkDisplay;
  return (
    <div className={classes.container}>
      {display && (
        <div>
          <img src={menu} className={classes.img}  onClick={linkDisplayHandler}/>
        </div>
      )}
      {displayLink && (
        <div className={classes.linksContainer}>
          {" "}
          {display && <div><img src={cancelIcon} className={classes.img}  onClick={linkHiderHandler}/></div>}
          <div className={classes.linkContainer} onClick={linkHiderHandler}>
            <NavLink to="/" exact activeClassName={classes.active}>
              Arrange Items
            </NavLink>
          </div>
         
          <div className={classes.linkContainer} onClick={linkHiderHandler}>
            <NavLink to="/message" activeClassName={classes.active}>
              Messages
            </NavLink>
          </div>
          <div className={classes.linkContainer} onClick={linkHiderHandler}>
            <NavLink to="/orders" activeClassName={classes.active}>
              Orders
            </NavLink>
          </div>
          <div className={classes.linkContainer} onClick={linkHiderHandler}>
            <NavLink to="/receipts" activeClassName={classes.active}>
              Receipts
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
export default NavLinks;
