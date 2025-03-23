import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";



interface CreateGymUseCaseRequest {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
    createdAt: Date;
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    
    constructor(private gymRepository: GymsRepository) {
    }

    async execute({ title, description, phone, latitude, longitude, createdAt }: CreateGymUseCaseRequest ) : Promise<CreateGymUseCaseResponse> {
        const gym = await this.gymRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude,
            
        });

        return {gym};
    }
}



    



// SOLID

// D - Dependency Inversion Principle