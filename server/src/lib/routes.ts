import { prisma } from "./prisma";
import { FastifyInstance } from "fastify";
import { z } from 'zod';
import dayjs from 'dayjs';

export const appRoutes = async (app: FastifyInstance) => {
    app.post('/habits', async (request) => {
        const validateHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number().min(0).max(6))
        });

        const { title, weekDays } = validateHabitBody.parse(request.body);

        await prisma.habit.create({
            data: {
                title,
                created_at: dayjs().startOf('day').toDate(),
                weekDays: { create: weekDays.map(weekDay => { return { week_day: weekDay } }) }
            }
        })
    });

    app.get('/day', async (request) => {
        const sanitizeDayParams = z.object({ date: z.coerce.date() });

        const { date } = sanitizeDayParams.parse(request.query);
        // const parsedDate = dayjs(date).startOf('day');
        const weekDay = dayjs(date).get('day');

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: { lte: date },
                weekDays: { some: { week_day: weekDay } }
            }
        });

        const day = await prisma.day.findFirst({
            where: { date/*: parsedDate.toDate()*/ },
            include: { dayHabits: true }
        });

        const completedHabits = day?.dayHabits.map(dayHabit => dayHabit.id);
        
        return { possibleHabits, completedHabits }
    });
}