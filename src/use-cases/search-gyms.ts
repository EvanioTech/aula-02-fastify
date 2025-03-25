import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";



interface SearchGymsUseCaseRequest {
   query: string;
   page: number;
}

interface SearchGymsUseCaseResponse {
    gyms: Gym[]
}

export class SearchGymsUseCase {
    
    constructor(private gymRepository: GymsRepository) {
    }

    async execute({ 
        query,
    page,
}: SearchGymsUseCaseRequest ) : Promise<SearchGymsUseCaseResponse> {
        const gyms = await this.gymRepository.searchMany(query, page);

        return {
            gyms,
        };
    }
}



    



// SOLID

// D - Dependency Inversion Principle