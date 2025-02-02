
const Login = () => {

  return (
    <div>
      <form >
        <input
          className="border"
          type="text"
          name="name"
          // onChange={changeHandler}
          placeholder="name"
        />
        <input
          className="border"
          type="text"
          name="email"
          // onChange={changeHandler}
          placeholder="email"
        />
        <input
          className="border"
          type="password"
          // onChange={changeHandler}
          placeholder="password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
