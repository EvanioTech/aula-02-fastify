import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { hash } from "bcryptjs";
import { registerUseCase } from "@/use-cases/register";

export async function register(req: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(req.body);

    try {
        await registerUseCase({ name, email, password });
        
    } catch (error) {
        return reply.status(409).send();
    }

    

    return reply.status(201).send({ message: "User created" });
}