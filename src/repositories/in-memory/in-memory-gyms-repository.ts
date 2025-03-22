import { Prisma, Gym } from "@prisma/client";

import { GymsRepository } from "../prisma/gyms-repository";


export  class InMemoryGymsRepository implements GymsRepository {
  
  public items: Gym[] = [];

  async findById(id: string) {
    return this.items.find((gym) => gym.id === id) || null;
  }

    async create(data: Prisma.GymUncheckedCreateInput) {
        const gym = {
            id: randomUUID(),
            name: data.name,
            address: data.address,
            createdAt: new Date(), 
        }

        this.items.push(gym);

        return gym;
    }

}