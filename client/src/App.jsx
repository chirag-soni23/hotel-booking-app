import './App.css';
import './index.css';
import Navbar from './components/Navbar';
import Homescreen from './components/screens/Homescreen';
import { BrowserRouter, Route, Link, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import Bookingscreen from './components/screens/Bookingscreen';
import RegisterScreen from './components/screens/RegisterScreen';
import Loginscreen from './components/screens/Loginscreen';
import Profilescreen from './components/screens/Profilescreen';
import Adminscreen from './components/screens/Adminscreen';
import Landingscreen from './components/screens/Landingscreen';

function App() {
  // Check if the user is logged in (you can use localStorage or any other method)
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <div className="App">
        <Navbar />
        <BrowserRouter>
          <Routes>
            {user ? (
              <>
                {/* If the user is logged in, show the HomeScreen */}
                <Route path="/" element={<Homescreen />} />
                <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen />} />
              </>
            ) : (
              <>
                {/* If the user is not logged in, show the LoginScreen */}
                <Route path="/" element={<Navigate to="/login" />} />
              </>
            )}

            {/* Always provide routes for Register and Login screens */}
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/login" element={<Loginscreen />} />
            <Route path='/profile'element={<Profilescreen/>}/>
            <Route path ="/admin" element ={<Adminscreen/>}/>
            <Route path="/home"element={<Landingscreen/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;




