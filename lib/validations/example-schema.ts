import { z } from "zod";

// Example validation schema - replace with your actual schemas
export const exampleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export type ExampleFormData = z.infer<typeof exampleSchema>;
