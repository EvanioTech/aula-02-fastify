import { prisma } from "@/lib/prisma";
import { UserRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";



interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {

    

    constructor(
       private userRepository: UserRepository,
    ) {
    }




    async execute({ name, email, password }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (userWithSameEmail) {
            throw new Error("User with this email already exists");
        }

       

         await this.userRepository.create({
            name,
            email,
            password_hash,
        });
    }
}




    



// SOLID

// D - Dependency Inversion Principle