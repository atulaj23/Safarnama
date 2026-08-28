import { z } from "zod";

export function zodErrorMessage(err: unknown): string {
  if (err instanceof z.ZodError) {
    return err.issues.map((i) => i.message).join(", ");
  }
  return "Invalid input";
}
