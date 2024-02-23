import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from "./pages/login/Login";
import Topbar from "./components/topbar/Topbar";
import Register from "./pages/register/Register";
import Buyer from "./pages/buyer/Buyer";
import Dealer from "./pages/dealer/Dealer";
import Vehicle from "./pages/vehicle/Vehicle";
import Add from "./pages/add/Add";
import Deals from "./pages/deals/Deal";
import Purchase from "./pages/purchase/Purchase"

function App() {
  return (
    <Router>
      <Topbar/>
      <Routes>
      <Route path="/" element={<Login />}/>

        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/buyer" element={<Buyer />}/>
        <Route path="/dealer" element={<Dealer />}/>
        <Route path="/vehicle" element={<Vehicle />}/>
        <Route path="/add" element={<Add />}/>
        <Route path="/deals" element={<Deals />}/>
        <Route path="/purchase/:id" element={<Purchase />}/>

        

      </Routes>
    </Router>
   
  );
}

export default App;
