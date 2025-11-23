import { useForm, type SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

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
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm text-gray-500">
            Email
          </label>
          <input type="email" id="" className="form" {...register("email")} />
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
        </div>

        <button type="submit" className="text-white bg-black py-2 px-4 border">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
