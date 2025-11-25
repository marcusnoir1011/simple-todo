// CORE
import { useForm, type SubmitHandler } from "react-hook-form";

// CUSTOM
import { registerSchema, type RegisterInput } from "../schema/register";
import { zodResolver } from "@hookform/resolvers/zod";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IFormInput extends RegisterInput {}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-3">Register</h2>
      <form
        className="flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="name" className="block mb-1 text-sm text-gray-500">
            Name
          </label>
          <input type="text" id="" className="form" {...register("name")} />
          {errors.name && (
            <span className="text-red-600 text-sm font-medium">
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm text-gray-500">
            Email
          </label>
          <input type="email" id="" className="form" {...register("email")} />
          {errors.email && (
            <span className="text-red-600 text-sm font-medium">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-sm text-gray-500"
          >
            Password
          </label>
          <input
            type="password"
            id=""
            className="form"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-600 text-sm font-medium">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-black py-2 px-4 border"
          disabled={isSubmitting}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
