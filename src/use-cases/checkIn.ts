import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/prisma/check-ins-repository";
import { GymsRepository } from "@/repositories/prisma/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinate";
import { MaxDistanceError } from "./errors/max-distance-errors";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins";

class UserTooFarError extends Error {
    constructor() {
        super("User is too far from gym");
        this.name = "UserTooFarError";
    }
}

class UserAlreadyCheckedInError extends Error {
    constructor() {
        super("User already checked in today");
        this.name = "UserAlreadyCheckedInError";
    }
}

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn;
}

export class CheckInUseCase {
    private static readonly MAX_DISTANCE = 0.1;

    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository
    ) {}

    async execute({
        userId,
        gymId,
        userLatitude,
        userLongitude,
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates(
            {
                latitude: parseFloat(gym.latitude.toFixed(6)),
                longitude: parseFloat(gym.longitude.toFixed(6)),
            },
            {
                latitude: userLatitude,
                longitude: userLongitude,
            }
        );

        if (distance > CheckInUseCase.MAX_DISTANCE) {
            throw new MaxDistanceError();
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
            userId,
            today
        );

        if (checkInOnSameDate) {
            throw new MaxNumberOfCheckInsError();
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId,
        });

        return {
            checkIn,
        };
    }
}
