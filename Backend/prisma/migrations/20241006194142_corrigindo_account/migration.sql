/*
  Warnings:

  - You are about to drop the column `accoutId` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transaction" (
    "transactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" REAL NOT NULL,
    "cashback" REAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    CONSTRAINT "transaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "contas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transaction" ("cashback", "date", "transactionId", "value") SELECT "cashback", "date", "transactionId", "value" FROM "transaction";
DROP TABLE "transaction";
ALTER TABLE "new_transaction" RENAME TO "transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
