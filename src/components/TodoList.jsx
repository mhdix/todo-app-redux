import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncTodo } from "../features/todo/todoSlice";

const TodoList = () => {
  const { todo, laoding, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodo());
  }, [dispatch]);

  console.log(todo);
  return (
    <div>
      {laoding ? (
        <p>loading ...</p>
      ) : error ? (
        <p>{error}</p>
      ) : todo ? (
        todo.map((item) => (
          <>
            <p key={item}>{item.text}</p>
            <p>{item.id}</p>
          </>
        ))
      ) : null}
    </div>
  );
};

export default TodoList;
