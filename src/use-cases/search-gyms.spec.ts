

import {expect, describe, it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gyms';



let gymsrepository: InMemoryGymsRepository;
let sut : SearchGymsUseCase;

describe('Search Gyms Use case', () => {

    beforeEach(async () => {
         gymsrepository = new InMemoryGymsRepository()
         sut = new SearchGymsUseCase(gymsrepository)

        

    })
    
    it('should be able to search for gyms', async () => {

     const gym1 =   await gymsrepository.create({
        title: 'Gym 1',
        description: 'Gym 1 description',
        phone: '123456789', 
        latitude: 123.123,
        longitude: 123.123,
        createdAt: new Date(),
        
           
        });

        await gymsrepository.create({
            title: 'Gym 2',
            description: 'Gym 2 description',   
            phone: '123456789',
            latitude: 123.123,
            longitude: 123.123,
            createdAt: new Date(),

            
         });

         const {gyms } =   await sut.execute({
            query: 'Gym 1',
            page: 1,

         });

            expect(gyms).toHaveLength(1)
            expect(gyms).toEqual([
                expect.objectContaining({ title: 'Gym 1'}),
               
            ])
})

it('should be able to fetch paginated user check-in history', async () => {

    for (let i = 1; i <= 22; i++) {
       await gymsrepository.create({
           title: `gym-0${i}`,
              description: 'Gym 1 description',
                phone: '123456789',
                latitude: 123.123,
                longitude: 123.123,
                createdAt: new Date(),
           
        });

       }

       const {gyms } =   await sut.execute({
          query: 'gym',
          page: 2,

       });

          expect(gyms).toHaveLength(2)
          expect(gyms).toMatchObject([
            { title: "gym-021" },
            { title: "gym-022" }
        ])
        
          
})

})