import { z } from "zod";

// regex email
const passwordRegex = /.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/;

// zod
const schema = z
  .object({
    firstName: z.string().min(2, { message: "First Name is required" }),
    lastName: z.string().min(2, { message: "Last Name is required" }),
    email: z.string().min(2, { message: "Email Address is required" }).email(),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 caracters" })
      .regex(passwordRegex, {
        message: "Password should contain at least 1 special characters",
      }),
    confirmPassword: z
      .string()
      .min(2, { message: "Confirm Password is required" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Inputs = Zod.infer<typeof schema>;

export { schema, type Inputs };
