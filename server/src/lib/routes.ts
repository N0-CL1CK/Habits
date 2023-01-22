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

        await prisma.habit.create({ data: {
            title,
            created_at: dayjs().startOf('day').toDate(),
            weekDays: { create: weekDays.map(weekDay => ({ week_day: weekDay }) ) }
        }});
    });

    app.get('/day', async (request) => {
        const sanitizeDayParams = z.object({ date: z.coerce.date() });

        const { date } = sanitizeDayParams.parse(request.query);
        const weekDay = dayjs(date).get('day');

        const possibleHabits = await prisma.habit.findMany({ where: {
            created_at: { lte: date },
            weekDays: { some: { week_day: weekDay } }
        }});

        const day = await prisma.day.findFirst({
            where: { date },
            include: { dayHabits: true }
        });

        const completedHabits = day?.dayHabits.map(dayHabit => dayHabit.habit_id);
        console.log(completedHabits);
        return { possibleHabits, completedHabits }
    });

    app.patch('/habits/:id/toggle', async (request) => {
        const validateHabitID = z.object({ id: z.string().uuid() });
        const { id } = validateHabitID.parse(request.params);
        const today = dayjs().startOf('day').toDate();

        let day = await prisma.day.findUnique({ where: { date:today } });

        if (!day) day = await prisma.day.create({ data: { date: today } });

        const dayHabit = await prisma.dayHabit.findUnique({ where: { day_id_habit_id: {
            day_id: day.id,
            habit_id: id
        }}});

        if (dayHabit) await prisma.dayHabit.delete({ where: { id: dayHabit.id } });
        else await prisma.dayHabit.create({ data: { day_id: day.id, habit_id: id }});
        
    });

    app.get('/summary', async () => {
        return await prisma.$queryRaw`
            SELECT D.id, D.date,
            (
                SELECT cast(count(*) AS FLOAT)
                FROM days_habits AS DH
                WHERE DH.day_id = D.id
            ) AS completed,
            (
                SELECT cast(count(*) AS FLOAT)
                FROM habits_week_days AS HWD
                INNER JOIN habits AS H
                ON H.id = HWD.habit_id
                WHERE
                    HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') AS INT)
                AND
                    H.created_at <= D.date
            ) AS amount,
        FROM days AS D
        `
    });
}