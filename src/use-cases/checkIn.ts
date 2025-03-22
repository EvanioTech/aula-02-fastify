import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { get } from "http";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinate";


interface CheckInUseCaseRequest {
    
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository, ) {}

    async execute({userId, gymId,
        userLatitude, userLongitude
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates(
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber(),
            },
            {
                latitude: userLatitude,
                longitude: userLongitude,
            }
        )

        const MAX_DISTANCE = 0.1;

        if (distance > MAX_DISTANCE) {
            throw new Error('User is too far from gym')
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
        