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
  name: z.string().min(3, {
    message: "Full Name is Required",
  }),
  email: z.string().email({
    message: "Email is Required",
  }),
  password: z.string().min(6, {
    message: "Password is required",
  }),
});

export const ResetSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password is required",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const BillFormSchema = z.object({
  streetAddress: z.string().min(3, {
    message: "Street Address is Required",
  }),
  city: z.string().min(3, {
    message: "City is required",
  }),
  postCode: z.string().min(3, {
    message: "Post Code is required",
  }),
  country: z.string().min(3, {
    message: "Country is required",
  }),
  clientName: z.string().min(3, {
    message: "Client Name is Required",
  }),
  clientEmail: z.string().min(3, {
    message: "Client Email is Required",
  }),
  ClientStreetAddress: z.string().min(3, {
    message: "Street Address is Required",
  }),
  ClientCity: z.string().min(3, {
    message: "City is required",
  }),
  ClientPostCode: z.string().min(3, {
    message: "Post Code is required",
  }),
  ClientCountry: z.string().min(3, {
    message: "Country is required",
  }),
  Description: z.string().min(6, {
    message: "Country is required",
  }),
});
