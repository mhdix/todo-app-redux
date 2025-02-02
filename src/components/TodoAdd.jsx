import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsyncTodo } from "../features/todo/todoSlice";

const TodoAdd = () => {
  const [addTodo, setAddTodo] = useState("");
  const { loading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAsyncTodo(addTodo));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {loading ? <p>loading ... </p> : error ? <p>{error}</p> : null}
        <input type="text" onChange={(e) => setAddTodo(e.target.value)} />
        <button>submit form</button>
      </form>
    </div>
  );
};

export default TodoAdd;
