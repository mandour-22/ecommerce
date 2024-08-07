import { z } from "zod";

// zod
const signInSchema = z.object({
  email: z.string().min(1, { message: "Email address is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

type Inputs = Zod.infer<typeof signInSchema>;

export { signInSchema, type Inputs };
