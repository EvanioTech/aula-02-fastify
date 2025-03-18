import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import { register } from "./http/controllers/register";
import { appRoutes } from "./http/routes";
import { env } from "./env";


export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _req, reply) => {
   if (error instanceof z.ZodError) {
       reply.status(400).send({ message: error.errors[0].message });
       
   }
   if (env.NODE_ENV !== "production") {
       console.error(error);
   }
   reply.status(500).send({ message: "Internal server error" });
}
);




