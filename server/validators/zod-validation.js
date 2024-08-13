import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string({ require_error: "Name is required" })
    .trim()
    .min(3, { message: "name must be 3 characters" })
    .max(255, { message: "name must not be 255 characters" }),

  email: z
    .string({ require_error: "email is required" })
    .trim()
    .email({ message: "invalid email" })
    .min(3, { message: "email must be 3 characters" })
    .max(255, { message: "email must not be 255 characters" }),
  password: z
    .string({ require_error: "password is required" })
    .trim()
    .min(7, { message: "password must be 7 characters" })
    .max(1012, { message: "password support 1024 characters only" }),
});
const contactSchema = z.object({
    name: z.string({ required_error: "name is required" }).min(2, { message: "name must be at least 2 characters" }).max(255, { message: "name must not exceed 255 characters" }),
    email: z.string({ required_error: "email is required" }).email({ message: "invalid email" }).max(255, { message: "email must not exceed 255 characters" }),
    message: z.string({ required_error: "message is required" }).min(10, { message: "message must be at least 10 characters" }).max(1000, { message: "message must not exceed 1000 characters" }),
  });

const loginSchema = z.object({
  email: z
    .string({ require_error: "email is required" })
    .trim()
    .email({ message: "invalid email" })
    .min(3, { message: "email must be 3 characters" })
    .max(255, { message: "email must not be 255 characters" }),
  password: z
    .string({ require_error: "password is required" })
    .trim()
    .min(7, { message: "password must be 7 characters" })
    .max(1012, { message: "password support 1024 characters only" }),
});
const forgetSchema = z.object({
    email: z
      .string({ required_error: "email is required" })
      .trim()
      .email({ message: "invalid email" })
      .min(3, { message: "email must be at least 3 characters" })
      .max(255, { message: "email must not exceed 255 characters" }),
    password: z
      .string({ required_error: "password is required" })
      .trim()
      .min(7, { message: "password must be at least 7 characters" })
      .max(1012, { message: "password must not exceed 1012 characters" }),
    confirmPassword: z
      .string({ required_error: "confirmPassword is required" })
      .trim()
      .min(7, { message: "confirmPassword must be at least 7 characters" })
      .max(1012, { message: "confirmPassword must not exceed 1012 characters" }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  }

);

export { registerSchema, loginSchema ,forgetSchema,contactSchema};
