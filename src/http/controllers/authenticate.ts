import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { AuthenticateUserUseCase } from "@/use-cases/authenticate";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        
        email: z.string().email(),
        password: z.string().min(6),
    });

    const {  email, password } = authenticateBodySchema.parse(req.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const authenticateUseCase = new AuthenticateUserUseCase(prismaUsersRepository);



        await authenticateUseCase.execute({  email, password });
        
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message });
    }

    
 throw error;
   
}
return reply.status(200).send();
}