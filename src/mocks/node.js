import { setupServer } from "msw/node";
import { handlers, usersHandler } from "./usersHandler.ts";

export const server = setupServer(...handlers, ...usersHandler);
