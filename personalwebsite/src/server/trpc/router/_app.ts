import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { emailRouter } from "./email";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  email: emailRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
