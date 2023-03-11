import { Request, Response } from 'express';
import { ICreateSchedule } from '../../interfaces/schedule.interfaces';
import { CreateScheduleService } from '../../services/schedules/CreateSchedule.service';

export class CreateScheduleController {
    async handle(request: Request, response: Response): Promise<Response> {
        const schedule: ICreateSchedule = request.body
        const token = String(request.headers.authorization);

        const createScheduleService = new CreateScheduleService();
        await createScheduleService.execute(schedule, token);

        return response.status(201).json({ message: "Schedule created" });
    }
}