"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  firstName: z.string().nonempty("This field is required."),
  lastName: z.string().nonempty("This field is required."),
  email: z.string().email("Please enter a valid email address."),
  queryType: z.enum(["Enquiry", "System Request"], {
    errorMap: () => ({ message: "Please select a query type." }),
  }),
  message: z.string().nonempty("This field is required."),
  consent: z.boolean().refine((val) => val, {
    message: "To submit this form, please consent to being contacted.",
  }),
});

type Tschema = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tschema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Tschema) => {
    console.log(data);
    toast.success("Message sent. Thanks for filling the form!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      
    });
  };

  return (
    <main className="flex h-screen items-center justify-center bg-green-100">
      <div className="font-karla my-4 max-w-lg rounded-lg bg-white p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Contact Us</h2>
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            <div className="mb-4 w-full">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name <span className="text-green-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-green-500 focus:ring-green-500 sm:text-sm"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name <span className="text-green-900">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm outline-none focus:border-green-500 focus:ring-green-500 sm:text-sm"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email <span className="text-green-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm outline-none sm:text-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Query Type <span className="text-green-800">*</span>
            </label>
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              <div className="mb-2 w-full">
                <div className="flex items-center rounded-md border border-gray-300 px-4 py-2 focus-within:border-green-500 focus-within:bg-gray-200">
                  <input
                    type="radio"
                    id="enquiry"
                    value="Enquiry"
                    className="mr-2 outline-none focus:bg-gray-200 focus:ring-green-500 focus:ring-opacity-50"
                    {...register("queryType")}
                  />
                  <label htmlFor="enquiry" className="text-sm text-gray-800">
                    General Enquiry
                  </label>
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center rounded-md border border-gray-300 px-4 py-2 focus-within:border-green-500 focus-within:bg-gray-200">
                  <input
                    type="radio"
                    id="system_request"
                    value="System Request"
                    className="mr-2 text-green-800 focus:ring-green-500 focus:ring-opacity-50"
                    {...register("queryType")}
                  />
                  <label
                    htmlFor="system_request"
                    className="text-sm text-gray-800"
                  >
                    System Request
                  </label>
                </div>
              </div>
            </div>
            {errors.queryType && (
              <p className="mt-2 text-sm text-red-600">
                {errors.queryType.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message <span className="text-green-800">*</span>
            </label>
            <textarea
              id="message"
              rows={6}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm outline-none sm:text-sm"
              {...register("message")}
            ></textarea>
            {errors.message && (
              <p className="mt-2 text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="my-6 flex items-center">
            <input
              type="checkbox"
              id="consent"
              className="mr-2 h-5 w-5 cursor-pointer rounded border-gray-300 bg-green-500 outline-none focus:ring-green-500"
              {...register("consent")}
            />
            <label htmlFor="consent" className="text-sm text-gray-700">
              I consent to being contacted by the team{" "}
              <span className="text-green-800">*</span>
            </label>
          </div>
          {errors.consent && (
            <p className="text-sm text-red-600">{errors.consent.message}</p>
          )}

          <button
            type="submit"
            className="my-6 w-full rounded-md bg-green-900 py-2 text-sm text-white hover:bg-green-950"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { FieldValues, useForm } from "react-hook-form";
// import z from "zod";

// const signUpSchema = z
//   .object({
//     email: z.string().email(),
//     password: z.string().min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// type TsignUpSchema = z.infer<typeof signUpSchema>;

// export default function Home() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm<TsignUpSchema>({
//     resolver: zodResolver(signUpSchema),
//   });

//   const onsubmit = async (data: TsignUpSchema) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     reset();
//   };
//   return (
//     <form
//       onSubmit={handleSubmit(onsubmit)}
//       className="flex h-screen flex-col items-center justify-center gap-y-2 bg-gray-400 pt-20"
//     >
//       {errors.email && (
//         <p className="text-red-500">{`${errors.email.message}`}</p>
//       )}
//       <input
//         {...register("email")}
//         type="email"
//         className="rounded px-4 py-2"
//         placeholder="Email"
//       />

//       {errors.password && (
//         <p className="text-red-500">{`${errors.password.message}`}</p>
//       )}
//       <input
//         {...register("password")}
//         type="password"
//         className="rounded px-4 py-2"
//         placeholder="Password"
//       />

//       {errors.confirmPassword && (
//         <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
//       )}
//       <input
//         {...register("confirmPassword")}
//         type="password"
//         required
//         className="rounded px-4 py-2"
//         placeholder="Confirm Password"
//       />

//       <button
//         className="rounded bg-blue-600 px-24 py-2 disabled:bg-gray-500"
//         type="submit"
//         disabled={isSubmitting}
//       >
//         Submit
//       </button>
//     </form>
//   );
// }
