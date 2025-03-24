

import {expect, describe, it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { FetchUserCheckInsHistoryUseCase } from './fetch-member-check-ins-history';


let chekInsRepository: InMemoryCheckInsRepository;
let sut : FetchUserCheckInsHistoryUseCase;

describe('Chek-in Use case', () => {

    beforeEach(async () => {
         chekInsRepository = new InMemoryCheckInsRepository()
         sut = new FetchUserCheckInsHistoryUseCase(chekInsRepository)

        

    })
    
    it('should be able to fetch check-in history', async () => {

     const gym1 =   await chekInsRepository.create({
           gym_id: 'gym-01',
           user_id: 'user-01',
           
        });

        await chekInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
            
         });

         const {checkIns } =   await sut.execute({
            userId: 'user-01',
            page: 1,

         });

            expect(checkIns).toHaveLength(2)
            expect(checkIns).toEqual([
                expect.objectContaining({ gym_id: 'gym-01'}),
                expect.objectContaining({ gym_id: 'gym-02' })
            ])
})

it('should be able to fetch paginated user check-in history', async () => {

    for (let i = 1; i <= 22; i++) {
       await chekInsRepository.create({
           gym_id: `gym-0${i}`,
           user_id: 'user-01',
           
        });

       }

       const {checkIns } =   await sut.execute({
          userId: 'user-01',
          page: 2,

       });

          expect(checkIns).toHaveLength(2)
          expect(checkIns).toMatchObject([
            { gym_id: "gym-021" },
            { gym_id: "gym-022" }
        ])
        
          
})

})