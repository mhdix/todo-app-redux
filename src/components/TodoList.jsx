import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faIR } from "date-fns/locale";
import { format } from "date-fns";
import {
  deleteAsyncTodo,
  getAsyncTodo,
  toggleAsyncTodo,
} from "../features/todo/todoSlice";

const TodoList = () => {
  const [sortType, setSortType] = useState("latest");
  const { todo, loading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodo());
  }, [dispatch]);

  const handleToggle = (todo) => {
    dispatch(toggleAsyncTodo(todo));
  };

  const handleDelete = (todo) => {
    dispatch(deleteAsyncTodo(todo));
  };

  // تابع سورت کردن داده‌ها با لاگ برای دیباگ
  const getSortedTodos = () => {
    if (!todo || todo.length === 0) return [];


    const sortedTodos = [...todo].sort((a, b) => {
      if (sortType === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

    return sortedTodos;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p>{error}</p>
        </div>
      ) : todo && todo.length > 0 ? (
        <>
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4 rtl:space-x-reverse">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <span>تعداد کل: {todo.length}</span>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  <span>
                    تکمیل شده: {todo.filter((t) => t.complated).length}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                لیست کارها
              </h2>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4 rtl:space-x-reverse">
                <button
                  onClick={() => setSortType("latest")}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    sortType === "latest"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  جدیدترین
                </button>
                <button
                  onClick={() => setSortType("earliest")}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    sortType === "earliest"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  قدیمی‌ترین
                </button>
              </div>
              <span className="text-gray-600">مرتب‌سازی:</span>
            </div>
          </div>
          <div className="space-y-4">
            {getSortedTodos().map((item, index) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1 space-x-4 rtl:space-x-reverse">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={() => handleToggle(item)}
                        checked={item.complated}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                    </label>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      title="حذف"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-lg text-end mb-3 text-ellipsis ${
                        item.complated
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {item.text}
                    </p>
                    <p className="text-sm text-gray-500 text-end">
                      تاریخ :{" "}
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </p>
                    <p className="text-sm text-gray-500 text-end">
                      شاره: {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-500">
          هیچ کاری برای نمایش وجود ندارد
        </div>
      )}
    </div>
  );
};

export default TodoList;
