

import {expect, describe, it, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

import { GetUserMetricsUseCase } from './get-user-metrics';


let chekInsRepository: InMemoryCheckInsRepository;
let sut : GetUserMetricsUseCase;

describe('Get User Metrics Use case', () => {

    beforeEach(async () => {
         chekInsRepository = new InMemoryCheckInsRepository()
         sut = new GetUserMetricsUseCase(chekInsRepository)

        

    })
    
    it('should be able to get check-ins count from metrics', async () => {

     const gym1 =   await chekInsRepository.create({
           gym_id: 'gym-01',
           user_id: 'user-01',
           
        });

        await chekInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
            
         });

         const {checkInsCount } =   await sut.execute({
            userId: 'user-01',
            

         });

            expect(checkInsCount).toEqual(2)
            
})



})