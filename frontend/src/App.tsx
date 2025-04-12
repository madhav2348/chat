import "./App.css";
// import CardBox from "./components/Card";
// import ChatSpace from "./components/ChatPlace";
import { Route, Routes } from "react-router-dom";
import Login from "./components/vanilla/login";
import Chat from "./components/vanilla/newchat";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/roomID" element={<ChatApp />} />
      </Routes>
    </>
  );
}

export default App;
