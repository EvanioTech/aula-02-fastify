
import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';
import { Decimal } from '@prisma/client/runtime/library';




let gymsRepository: InMemoryGymsRepository;
let sut : CreateGymUseCase;

describe('Create Gym Use Case', () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()

        sut = new CreateGymUseCase(gymsRepository)
   }
   )

it('should hash the register', async () => {

  

    const {gym} = await sut.execute({
        title: 'Academia do tonhao',
        description: '',
        phone: '',
        latitude: -3.8744272,
        longitude: -38.5017396,
        createdAt: new Date(),
        
    });

     expect(gym.id).toEqual(expect.any(String))

})


})