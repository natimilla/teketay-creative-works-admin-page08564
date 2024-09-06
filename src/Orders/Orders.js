import { useEffect, useState } from "react";
import classes from "./Orders.module.css";
import { useDispatch } from "react-redux";
import { displayActions } from "../Store/Display";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, remove, ref as REF } from "firebase/database";
import { getStorage } from "firebase/storage";
function Orders() {
  const [itemsData, setItemsData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setisEmpty] = useState(false);
  const dispatch = useDispatch();

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
  const database = getDatabase(app);
  const storage = getStorage(app);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://teketay-creative-works-default-rtdb.firebaseio.com/Orders.json"
        );
        const data = await response.json();
        if (data === null) {
          setisEmpty(true);
          setLoading(false);
          return;
        }
        if (data.length === 0) {
          setisEmpty(true);
          setLoading(false);
          return;
        }
        const loaded_items_data = [];
        const loaded_client_data = [];
        for (let key in data) {
          const orders = data[key];
          let x = orders.length - 1;
          let y = orders.length;
          let display=true
          if(data[key][x].phone2.length===0){
            display=false
          }
          loaded_client_data.push({
            id: key,
            address: data[key][x].address,
            fullname: data[key][x].fullname,
            phone1: data[key][x].phone1,
            phone2: data[key][x].phone2,
            display:display
          });
          for (let i = 0; i < x; i++) {
            loaded_items_data.push({
              id: key,
              name: data[key][i].name,
              amount: data[key][i].amount,
              price: data[key][i].price,
            });
          }
        }
        setItemsData(loaded_items_data);
        setClientData(loaded_client_data);
        setLoading(false);
      } catch (error) {
        dispatch(displayActions.errorHandler());
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const removeHandler = async(id) => {
    dispatch(displayActions.loadingHandler());
    try {
      if (clientData.length === 1) {
        setisEmpty(true);
      }
      const itemRef = REF(database, `Orders/${id}`);
      await remove(itemRef);
      setClientData((prevData) => prevData.filter((client) => client.id !== id));
      dispatch(displayActions.loadingHandler());
    } catch (error) {
      dispatch(displayActions.loadingHandler());
      dispatch(displayActions.errorHandler());
      return;
    }
    console.log(id);
    
   
  };
  return (
    <div className={classes.container}>
      {loading && <div>Loading...</div>}
      {isEmpty && <div>No orders yet.</div>}
      {clientData.map((client) => {
        return (
          <div className={classes.listsContainer}>
            <div className={classes.label}>FullName : {client.fullname}</div>
            <div className={classes.label}>phone number 1: {client.phone1}</div>
           {client.display &&  <div className={classes.label}>Phone number 2: {client.phone2}</div>}
            <div className={classes.label}>Address: {client.address}</div>
            <div className={classes.itemsContainer}>
              <table>
                <tr>
                  <th>Item Name</th>
                  <th>Item Amount</th>
                  <th>Item Price</th>
                </tr>
                {itemsData
                  .filter((item) => item.id === client.id)
                  .map((item) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>{item.price}</td>
                      </tr>
                    );
                  })}
              </table>
            </div>
            <div className={classes.buttonContainer}>
              <button className={classes.button} onClick={()=>{removeHandler(client.id)}}>DELIVERED</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Orders;
