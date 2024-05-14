import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Nav from "./Components/Nav/Nav";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
