import classes from "./Home.module.css";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, remove, ref as REF } from "firebase/database"; // or 'getFirestore' for Cloud Firestore
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { displayActions } from "../Store/Display";
function WallArts() {
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
  const dispatch = useDispatch();
  const app = initializeApp(firebaseConfig);

  // Get references to the Firebase services you need
  const auth = getAuth(app);
  const database = getDatabase(app); // or getFirestore(app) for Cloud Firestore
  const storage = getStorage(app);
  const [isEmpty, setIsEMpty] = useState(false);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [loadedData, setLoadedData] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [additem, setAddItem] = useState(false);
  const [isLoading,setLoading]=useState(false);

  const addItemHandler = () => {
    setAddItem((prev) => (prev = !prev));
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const imageChangeHandler = async (event) => {
    const file = event.target.files[0];

    const imageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Calculate the upload progress as a percentage
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("Upload failed", error);
      },
      async () => {
        // Upload completed successfully
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImage(downloadURL);
      }
    );
  };
  const submitHandler = async (event) => {
    dispatch(displayActions.loadingHandler());
    event.preventDefault();
    //  console.log(image)
    if (!image) {
      alert("Image upload is still in progress. Please wait.");
      return;
    }
    const data = [];
    data.push({
      name: name,
      price: price,
      img: image,
    });
    try {
      const response = await fetch(
        "https://teketay-creative-works-default-rtdb.firebaseio.com/Wall_arts.json",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      dispatch(displayActions.loadingHandler());
      dispatch(displayActions.errorHandler());
      return;
    }
    setImage("");
    setName("");
    setPrice("");
    setUploadProgress(0);
    document.querySelector("input[type='file']").value = "";
    dispatch(displayActions.loadingHandler());
    dispatch(displayActions.submittedHandler());
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://teketay-creative-works-default-rtdb.firebaseio.com/Wall_arts.json"
      );
      const data = await response.json();

      if (data === null) {
        setIsEMpty(true);
        setLoading(false)
        return;
      }
      if (data.length === 0) {
        setIsEMpty(true);
        setLoading(false)
        return;
      } else {
        const DUMMY_FILE = [];
        for (const key in data) {
          DUMMY_FILE.push({
            id: key,
            Name: data[key][0].name,
            Price: data[key][0].price,
            image: data[key][0].img,
          });
        }
        setLoadedData(DUMMY_FILE);
        setIsEMpty(false);
        setLoading(false)
      }
      
    } catch (error) {
      setLoading(false)
      dispatch(displayActions.errorHandler());
      return;
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const removeHandler = async(id) => {
    dispatch(displayActions.loadingHandler());
    try {
      if (loadedData.length === 1) {
        setIsEMpty(true);
      }

      const itemRef = REF(database, `Wall_arts/${id}`);
      await remove(itemRef);
      setLoadedData((prevData) => prevData.filter((item) => item.id !== id));
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
      <div>
        <div className={classes.heading}>Wall Arts</div>
        <div className={classes.horizontalLineContainer}>
          <hr className={classes.horizontalLine} />
        </div>
        <div className={classes.buttonContainer}>
          <div></div>
          <button className={classes.addButton} onClick={addItemHandler}>
            Add Item
          </button>
        </div>
        {isLoading && <div>Loading...</div>}
        {additem && (
          <form onSubmit={submitHandler} className={classes.form}>
            <div className={classes.formContainer}>
              <div className={classes.label}>
                <label>Name</label>
              </div>
              <div>
                <input
                  type="text"
                  onChange={nameChangeHandler}
                  value={name}
                  className={classes.input}
                  required
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <div className={classes.label}>
                <label>Price</label>
              </div>
              <div>
                <input
                  type="number"
                  onChange={priceChangeHandler}
                  value={price}
                  className={classes.input}
                  required
                />
              </div>
            </div>
            <div className={classes.formContainer}>
              <div className={classes.label}>
                <label>Image</label>
              </div>
              <div>
                <input
                  type="file"
                  id="image-input"
                  accept="image/jpeg, image/png"
                  onChange={imageChangeHandler}
                  className={classes.input}
                  required
                />
                <h>{uploadProgress}%</h>
              </div>
            </div>
            <div>
              <button type="submit" className={classes.submit}>
                SUBMIT
              </button>
            </div>
          </form>
        )}
        <div>{isEmpty && <p>No result Found</p>} </div>
        <div className={classes.dummyContainer}>
          {" "}
          {loadedData.map((item) => (
            <div key={item.id} className={classes.listContainer}>
              <div>
                <img src={item.image} className={classes.img} />
              </div>
              <div className={classes.Name}>Name: {item.Name}</div>
              <div className={classes.Name}>Price: {item.Price}</div>
              <button
                onClick={() => {
                  removeHandler(item.id);
                }}
                className={classes.submit}
              >
                Remove Item
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default WallArts;
