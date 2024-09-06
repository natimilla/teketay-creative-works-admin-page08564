import { useEffect } from 'react';
import classes from './Receipts.module.css';
import { useState } from 'react';
import { displayActions } from '../Store/Display';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, remove, ref as REF } from "firebase/database";
import { getStorage } from "firebase/storage";
import { useDispatch } from 'react-redux';
function Receipts(){
    const [Receipts,setReceipts]=useState([]);
    const[loading,setLoading]=useState(true);
    const[isEmpty,setisEmpty]=useState(false);
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
      const database = getDatabase(app);
      const storage = getStorage(app);
    useEffect(()=>{
        const fetchData=async()=>{
            const response = await fetch(
                "https://teketay-creative-works-default-rtdb.firebaseio.com/Receipts.json"
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
              const loaded_image=[];
              for(let key in data){
                 loaded_image.push({
                    id:key,
                    src:data[key][0].image
                 })   
              }
              setReceipts(loaded_image)
              setLoading(false)
        }
        fetchData()
    })

    const removeHandler = async(id) => {
        dispatch(displayActions.loadingHandler());
        try {
          if (Receipts.length === 1) {
            setisEmpty(true);
          }
          const itemRef = REF(database, `Receipts/${id}`);
          await remove(itemRef);
          setReceipts((prevData) => prevData.filter((client) => client.id !== id));
          dispatch(displayActions.loadingHandler());
        } catch (error) {
          dispatch(displayActions.loadingHandler());
          dispatch(displayActions.errorHandler());
          return;
        }
        console.log(id);
        
    }    

    return <div className={classes.container}>
           {loading && <div>Loading...</div>}
           {isEmpty && <div>No results Found</div>}
           {Receipts.map(img=>{
            return <div className={classes.imagesContainer}>
            <div className={classes.singleImageContainer}>
             <div><a href={img.src} download><img src={img.src} className={classes.img} alt='Receipt Image'/></a></div>
             <div className={classes.buttonContainer}><div className={classes.button} onClick={()=>{removeHandler(img.id)}}>REMOVE</div></div> 
            </div>
         </div>
           })}
    </div>
}
export default Receipts