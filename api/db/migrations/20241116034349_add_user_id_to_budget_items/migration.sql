/*
  Warnings:

  - Added the required column `userId` to the `BudgetItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BudgetItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "budgetId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "recurring" BOOLEAN NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "dayOfMonth" INTEGER NOT NULL,
    CONSTRAINT "BudgetItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BudgetItem_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BudgetItem" ("amount", "budgetId", "createdAt", "dayOfMonth", "endDate", "id", "recurring", "startDate", "type", "updatedAt") SELECT "amount", "budgetId", "createdAt", "dayOfMonth", "endDate", "id", "recurring", "startDate", "type", "updatedAt" FROM "BudgetItem";
DROP TABLE "BudgetItem";
ALTER TABLE "new_BudgetItem" RENAME TO "BudgetItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
