import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import TodoAdd from "./components/TodoAdd";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-white font-bold text-xl">
                تودو لیست
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/add"
                className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center"
              >
                <span>افزودن تودو جدید</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/add" element={<TodoAdd />} />
      </Routes>
    </>
  );
}

export default App;
