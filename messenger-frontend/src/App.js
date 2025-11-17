import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Signup from './components/Signup';
import Contactsaving from './components/Contactsaving';
function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/contactsaving' element={<Contactsaving/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
