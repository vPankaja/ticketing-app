
import './App.css';
import Home from './components/Pages/Home';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './shared/Header';
import Footer from './shared/Footer';
import Login from './components/Pages/Auth/Login';
import SignUp from './components/Pages/Auth/SignUp';
import AddReservation from './components/Pages/Item/Reservation/AddReservation';
import EditReservation from './components/Pages/Item/Reservation/EditReservation';
import TableReser from './components/Pages/Item/Reservation/TableReser';
import AddTrain from './components/Pages/Item/Train/AddTrain';
import TrainTable from './components/Pages/Item/Train/TrainTable';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <div>
          <Routes>
            {/* booking */}
            <Route path="/" element={<Home />} />
            
            {/* Train */}
            <Route path="/addtrain" element={<AddTrain />} />
            <Route path="/tabletrain" element={<TrainTable />} />


            {/* Reservation */}
            <Route path="/addreservation" element={<AddReservation />} />
             <Route path="/editreservation" element={<EditReservation />} />
             <Route path="/tablereser" element={<TableReser />} />
             
             
             


            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />


          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
