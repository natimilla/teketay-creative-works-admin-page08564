import { useEffect, useState } from "react";
import classes from "./Page2.module.css";
import deleteIcon from './delete.svg';
import { useDispatch } from "react-redux";
import { displayActions } from "../Store/Display";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, remove, ref as REF } from "firebase/database";
import { Helmet } from "react-helmet"; 
function Page2() {
  const [isEmpty, setEmpty] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const dispatch=useDispatch()
  
  const firebaseConfig = {
    apiKey: "AIzaSyDdnyMJwq2czmZEsJmU36gIS4Wpvndazqw",
    authDomain: "teketay-creative-works.firebaseapp.com",
    databaseURL: "https://teketay-creative-works-default-rtdb.firebaseio.com",
    projectId: "teketay-creative-works",
    storageBucket: "teketay-creative-works.appspot.com",
    messagingSenderId: "920356138814",
    appId: "1:920356138814:web:944a36e15e060817c1c66f",
    measurementId: "G-KCXZ1CYB6V",
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app); // or getFirestore(app) for Cloud Firestore
 
  useEffect(() => {
    const fetchData = async () => {
     try{
        const response = await fetch(
            "https://teketay-creative-works-default-rtdb.firebaseio.com/message.json"
          );
          const data = await response.json();
          if (data === null) {
            setEmpty(true);
            return;
          }
          if (data.length === 0) {
            setEmpty(true);
            return;
          }
          setEmpty(false);
          const DUMMY_FILE = [];
          for (const key in data) {
            DUMMY_FILE.push({
              id:key,
              name: data[key][0].name,
              phone: data[key][0].phone,
              message: data[key][0].message,
              email:data[key][0].email
            });
          }
          setLoadedData(DUMMY_FILE);
        }
        catch(error){
            dispatch(displayActions.errorHandler())
        }
     }
    fetchData();
  }, []);
  const removeHandler=async(id)=>{
    dispatch(displayActions.loadingHandler());
    try {
      if (loadedData.length === 1) {
        setEmpty(true);
      }

      const itemRef = REF(database, `message/${id}`);
      await remove(itemRef);
      setLoadedData((prevData) => prevData.filter((item) => item.id !== id));
      dispatch(displayActions.loadingHandler());
    } catch (error) {
      dispatch(displayActions.loadingHandler());
      dispatch(displayActions.errorHandler());
      return;
    }
    console.log(id)
  }
  return (
    <div className={classes.container}>
      <Helmet>
      <title>Teketay creative works admin message page</title>
        <meta name="Teketay creative works admin page<" content="This is the messages admin  page of teketay creative works" />
      </Helmet>
        {isEmpty && <div>No results Found</div>}
     {!isEmpty &&  <table>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Message</th>
        </tr>
        {loadedData.map((item)=>{
            return <tr>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
                <td><img src={deleteIcon} className={classes.img} onClick={()=>{removeHandler(item.id)}}/></td>
            </tr>
        })}
      </table>}
    </div>
  );
}
export default Page2;
