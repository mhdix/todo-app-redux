
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <p>header</p>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/add" element={<TodoAdd />} />
      </Routes>
    </>
  );
}

export default App;
