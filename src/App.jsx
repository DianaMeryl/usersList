import UserList from './components/UserList';
import Home from './components/Home';
import UserDetails from './components/UserDetails';
import NoPage from './components/NoPage';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserList itemsPerPage={5} />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="*" element={<NoPage/>} />
      </Routes>
      </Router>
    </>
  )
}

export default App
