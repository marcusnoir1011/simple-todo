// CORE
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// CUSTOM
import { type AppDispatch, type RootState } from "../store";
import { useLogoutMutation } from "../slices/userApiSlice";
import { clearUserInfo } from "../slices/authSlice";

const Header = () => {
  const useInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout({});
      dispatch(clearUserInfo());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <nav className="flex my-10 items-center justify-between">
      <Link to={"/"} className="text-3xl font-bold">
        Simple Share
      </Link>

      <div className="space-x-4">
        {useInfo ? (
          <>
            <Link to={"/profile"}>Profile</Link>
            <button
              type="button"
              className="text-white bg-red-600 py-2 px-4 border"
              onClick={logoutHandler}
              disabled={isLoading}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="text-white bg-black py-2 px-4 border"
            >
              Login
            </Link>
            <Link to={"/register"} className="border py-2 px-4">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
