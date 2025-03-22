import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface CheckInUseCaseRequest {
    
    userId: string;
    gymId: string;
    userLatitute: number;
    userLongitude: number;
    gymLatitude: number;
    gymLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository, ) {}

    async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        

        const checkInOnSameDate =
         await this.checkInsRepository.findByUserIdOnDate(
            userId,
             new Date());

        if (checkInOnSameDate) {
            throw new Error('User already checked in today')
        }




        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId,
        })

        return {
            checkIn,
        }
    }

}
        