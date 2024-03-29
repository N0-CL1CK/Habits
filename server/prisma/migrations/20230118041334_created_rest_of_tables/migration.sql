-- CreateTable
CREATE TABLE "habits_week_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "days_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "habits_week_days_habit_id_week_day_key" ON "habits_week_days"("habit_id", "week_day");

-- CreateIndex
CREATE UNIQUE INDEX "day_date_key" ON "day"("date");

-- CreateIndex
CREATE UNIQUE INDEX "days_habits_day_id_habit_id_key" ON "days_habits"("day_id", "habit_id");
