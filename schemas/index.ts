import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});
export const ForgotPsswordSchema = z.object({
  email: z.string().email({
    message: "Email is Required",
  }),
 
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Full Name is Required",
  }),
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

export const ResetSchema = z.object({
  password: z.string().min(6, {
    message: "Password is required",
  }),  confirmPassword: z.string(),
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  }
);