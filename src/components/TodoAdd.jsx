import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsyncTodo } from "../features/todo/todoSlice";
import { useNavigate } from "react-router-dom";

const TodoAdd = () => {
  const [addTodo, setAddTodo] = useState("");
  const { loading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!addTodo.trim()) return;

    await dispatch(addAsyncTodo(addTodo));
    setAddTodo("");
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-end">
          افزودن کار جدید
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="todo"
              className="block text-gray-700 text-sm font-bold mb-2 text-end"
            >
              عنوان کار
            </label>
            <input
              type="text"
              id="todo"
              value={addTodo}
              onChange={(e) => setAddTodo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-end focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
              placeholder="کار جدید خود را وارد کنید..."
              disabled={loading}
            />
          </div>

          <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading || !addTodo.trim()}
              className={`px-6 py-2 text-white rounded-lg transition-colors duration-200 flex items-center ${
                loading || !addTodo.trim()
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  در حال ثبت...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  افزودن کار
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoAdd;
