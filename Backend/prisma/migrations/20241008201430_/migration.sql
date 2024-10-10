/*
  Warnings:

  - You are about to drop the column `cnpj` on the `contas` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `contas` table. All the data in the column will be lost.
  - Added the required column `cpfOrCnpj` to the `contas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `contas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpfOrCnpj" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_contas" ("email", "id", "name", "password", "status") SELECT "email", "id", "name", "password", "status" FROM "contas";
DROP TABLE "contas";
ALTER TABLE "new_contas" RENAME TO "contas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
