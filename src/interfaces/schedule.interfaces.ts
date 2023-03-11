import { z } from "zod";
import { createScheduleSchema, scheduleSchema } from "../schemas/schedule.schemas";

export type ISchedule = z.infer<typeof scheduleSchema>
export type ICreateSchedule = z.infer<typeof createScheduleSchema>