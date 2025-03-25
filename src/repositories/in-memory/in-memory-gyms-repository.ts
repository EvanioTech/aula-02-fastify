import { Prisma, Gym } from "@prisma/client";
import { GymsRepository } from "../prisma/gyms-repository";
import { randomUUID } from "node:crypto";
import { Decimal } from "@prisma/client/runtime/library";


export  class InMemoryGymsRepository implements GymsRepository {
  
  public items: Gym[] = [];

  async findById(id: string): Promise<{
     id: string; title: string; description: string | null; 
     phone: string | null; latitude: Decimal; 
     longitude: Decimal; createdAt: Date; } | null> {
    const gym = this.items.find((item) => item.id === id);
    return gym ?? null;
  }

  async searchMany(query: string, page: number) {
    return this.items.filter(
        (item) => item.title.includes(query)).slice((page - 1) * 20 , page * 20)
    ;
}

    

    async create(data: Prisma.GymCreateInput) {
            const gym = {
                id: data.id ?? randomUUID(),
                title: data.title,
                description: data.description ?? null,
                phone: data.phone ?? null,
                latitude: new Prisma.Decimal(data.latitude.toString()),
                longitude: new Prisma.Decimal(data.longitude.toString()),
                createdAt: new Date(),
                
            }
    
            this.items.push(gym);
    
            return gym;
        }

}