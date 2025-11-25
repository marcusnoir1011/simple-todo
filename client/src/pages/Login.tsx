// CORE
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// CUSTOM
import { type LoginInput, loginSchema } from "../schema/login";
import { useLoginMutation } from "../slices/userApiSlice";
import type { AppDispatch } from "../store";
import { setUserInfo } from "../slices/authSlice";
import { useEffect } from "react";
import type { RootState } from "../store";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormInput extends LoginInput {}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>({
    resolver: zodResolver(loginSchema),
  });
  const [Login, { isLoading }] = useLoginMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await Login(data).unwrap();
      if (!response) return;

      dispatch(setUserInfo(response));
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string }; error?: string };
      toast.error(apiError.data?.message || apiError.error || "Login failed");
      reset();
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-3">Login</h2>
      <form
        className="flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block mb-1 text-sm text-gray-500" htmlFor="email">
            Email
          </label>
          <input className="form" type="email" id="" {...register("email")} />
          {errors.email && (
            <span className="text-red-600 text-sm font-medium">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label
            className="block mb-1 text-sm text-gray-500"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="form"
            type="password"
            id=""
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-600 text-sm font-medium">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          className="text-white bg-black py-2 px-4 border"
          type="submit"
          disabled={isSubmitting || isLoading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
