import { CheckIn, Prisma } from "@prisma/client";
import { UserRepository } from "../users-repository";
import { CheckInsRepository } from "../prisma/check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";



export class InMemoryCheckInsRepository implements CheckInsRepository {
    
  
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = dayjs(date).startOf('day').toDate();
    const endOfDay = dayjs(date).endOf('day').toDate();

    const checkInOnSameDate = this.items.find(
        (checkIn) =>{
            const checkInDate = dayjs(checkIn.createdAt).toDate();
            const isOnSameDate = checkInDate >= startOfDay && checkInDate <= endOfDay;
            return checkIn.user_id === userId && isOnSameDate;
        }
    );

    if (!checkInOnSameDate) {
        return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items.filter(
        (item) => item.user_id === userId).slice((page - 1) * 20 , page * 20)
    ;
}

async countByUserId(userId: string): Promise<number> {
    return this.items.filter(
        (item) => item.user_id === userId).length
    ;

}
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            createdAt: new Date(), 
            updatedAt: new Date(),
        }

        this.items.push(checkIn);

        return checkIn;
    }

}