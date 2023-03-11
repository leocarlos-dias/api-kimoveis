import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { RealEstate } from "../../entities/RealEstate.entity";
import { IRealEstate } from "../../interfaces/realEstate.interfaces";

export class GetRealEstateService {
    async execute(): Promise<IRealEstate[]> {
        const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
        const realEstate: IRealEstate[] = await realEstateRepository.find({
            relations: {
                address: true
            }
        });

        return realEstate
    }
}