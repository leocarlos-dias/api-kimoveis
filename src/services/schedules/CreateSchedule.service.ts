import { Repository } from "typeorm";
import { AppDataSource } from "../../database/dataSource";
import { RealEstate } from "../../entities/RealEstate.entity";
import { Schedule } from "../../entities/Schedule.entity";
import { User } from "../../entities/User.entity";
import { CustomError } from "../../errors/CustomError";
import { IRealEstate } from "../../interfaces/realEstate.interfaces";
import { ICreateSchedule, ISchedule } from "../../interfaces/schedule.interfaces";
import { IDecodedToken, IUser } from "../../interfaces/user.interfaces";
import { isTimeWithinBusinessHours } from "../../libs/isTimeWithinBusinessHours";
import { isWeekend } from "../../libs/isWeekend";
import { verifyToken } from "../../libs/verifyToken";

export class CreateScheduleService {
    async execute(schedule: ICreateSchedule, token: string): Promise<void> {

        const { sub }: IDecodedToken = verifyToken(token);

        if (!isTimeWithinBusinessHours(schedule.hour)) {
            throw new CustomError(400, "Invalid hour, available times are 8AM to 18PM");
        }
        if (isWeekend(schedule.date)) {
            throw new CustomError(400, "Invalid date, work days are monday to friday");
        }

        const userReposity: Repository<User> = AppDataSource.getRepository(User);
        const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);
        const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

        const scheduleUserAlreadyExists: ISchedule[] | null = await scheduleRepository
            .createQueryBuilder("schedules")
            .select()
            .leftJoinAndSelect("schedules.user", "user")
            .where("schedules.date = :date", { date: schedule.date })
            .andWhere("schedules.hour = :hour", { hour: schedule.hour })
            .andWhere("user.id = :userId", { userId: sub })
            .getMany();
        if (scheduleUserAlreadyExists.some(schedule => schedule.user.id === Number(sub)))
            throw new CustomError(409, "User schedule to this real estate at this date and time already exists");

        const scheduleAlreadyExists: ISchedule | null = await scheduleRepository
            .createQueryBuilder("schedules")
            .select()
            .where("schedules.date = :date", { date: schedule.date })
            .andWhere("schedules.hour = :hour", { hour: schedule.hour })
            .getOne();
        if (scheduleAlreadyExists) {
            throw new CustomError(409, "Schedule to this real estate at this date and time already exists");
        }

        const realEstateFound: IRealEstate | null = await realEstateRepository.findOneBy({ id: schedule.realEstateId });
        if (!realEstateFound) {
            throw new CustomError(404, "RealEstate not found");
        }

        const userFound: IUser | null = await userReposity.findOneBy({ id: Number(sub) });
        if (!userFound) {
            throw new CustomError(404, "User not found");
        }

        await scheduleRepository.save(scheduleRepository.create({ ...schedule, user: userFound, realEstate: realEstateFound }));
    }
}