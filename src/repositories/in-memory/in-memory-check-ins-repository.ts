import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../users-repository";
import { CheckInsRepository } from "../prisma/check-ins-repository";
import { randomUUID } from "node:crypto";



export class InMemoryCheckInsRepository implements CheckInsRepository {
  
  public items: User[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            createdAt: new Date(), 
        }

        this.items.push(checkIn);

        return checkIn;
    }

}