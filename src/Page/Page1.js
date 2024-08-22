import Main from "../Main.js/Main";
import SideBar from "../SideBar/SideBar";
import classes from "./Page1.module.css";
import { Helmet } from "react-helmet";
function Page1() {
  return (
    <div className={classes.container}>
      <Helmet>
      <title>Teketay creative works admin home page</title>
        <meta name="Teketay creative works admin page<" content="This is the home admin  page of teketay creative works" />
      </Helmet>
      <Main />
    </div>
  );
}
export default Page1;
