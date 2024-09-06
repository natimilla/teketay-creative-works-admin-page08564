import logo from './logo.svg';
import './App.css';
import Page1 from './Page/Page1';
import { useSelector } from 'react-redux';
import Overlay from './Main.js/overlay';
import { Route } from 'react-router-dom';
import Page2 from './Page/Page2';
import SideBar from './SideBar/SideBar';
import Page3 from './Page/Page3';
import Page4 from './Page/Page4';

function App() {
  const loading=useSelector(state=>state.display.loading);
    const submitted=useSelector(state=>state.display.submitted);
    const error=useSelector(state=>state.display.error);
    const display=loading||submitted||error
  return (
    <div className="App">
      <SideBar/>
      {display && <Overlay/>}
     <Route path='/' exact><Page1/></Route>
     <Route path='/message'><Page2/></Route> 
     <Route path='/orders'><Page3/></Route>
     <Route path='/receipts'><Page4/></Route>
    </div>
  );
}

export default App;
