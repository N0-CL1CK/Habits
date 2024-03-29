/*
  Warnings:

  - You are about to drop the `day` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "day_date_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "day";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_days_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL,
    CONSTRAINT "days_habits_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "days" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "days_habits_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_days_habits" ("day_id", "habit_id", "id") SELECT "day_id", "habit_id", "id" FROM "days_habits";
DROP TABLE "days_habits";
ALTER TABLE "new_days_habits" RENAME TO "days_habits";
CREATE UNIQUE INDEX "days_habits_day_id_habit_id_key" ON "days_habits"("day_id", "habit_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "days_date_key" ON "days"("date");
