import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const loginUserSchema = z.object({
  email: z.email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});