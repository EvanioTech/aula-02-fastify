import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

export const app = fastify();

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    email: "matias@teste.com",
    name: "Matias"
    }
    }).then(() => {
      console.log('User created');
    }
    ).catch((error) => {
      console.error(error);
    }
    );