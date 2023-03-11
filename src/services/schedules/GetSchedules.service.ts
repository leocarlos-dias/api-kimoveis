import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { RealEstate } from "../../entities/RealEstate.entity";
import { CustomError } from "../../errors/CustomError";
import { IRealEstate } from "../../interfaces/realEstate.interfaces";

export class GetSchedulesService {
    async execute(id: number): Promise<IRealEstate> {
        const scheduleRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
        const schedules: IRealEstate | null = await scheduleRepository.findOne({
            relations: {
                address: true,
                category: true,
                schedules: {
                    user: true
                }
            },
            where: {
                id
            }
        });
        if (!schedules) throw new CustomError(404, "RealEstate not found");

        return schedules;
    }
}