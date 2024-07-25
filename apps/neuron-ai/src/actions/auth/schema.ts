import { z } from "zod";

export const formSchema = z
  .object({
    fullName: z.string().min(10).max(50),
    email: z.string().email({ message: "Incorrect email format" }),
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "password should contain only alphabets and numbers"
      ),
    type: z.union([z.literal("student"), z.literal("owner")]),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export const loginSchema = z.object({
  email: z.string().email({ message: "Incorrect email format" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    })
    .refine(
      (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
      "password should contain only alphabets and numbers"
    ),
});
