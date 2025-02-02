import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAsyncUser } from "../features/user/userSlice";

const Users = () => {
  const { users, loading, error } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncUser());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : error ? (
        <p>{error}</p>
      ) : users ? (
        users.map((item, index) => <p key={index}>{item.name}</p>)
      ) : null}
    </div>
  );
};

export default Users;
