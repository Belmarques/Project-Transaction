/*
  Warnings:

  - You are about to drop the `conta` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "conta";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "contas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT,
    "cnpj" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "transaction" (
    "transactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" REAL NOT NULL,
    "cashback" REAL NOT NULL,
    "accoutId" INTEGER NOT NULL,
    CONSTRAINT "transaction_accoutId_fkey" FOREIGN KEY ("accoutId") REFERENCES "contas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "contas_cpf_key" ON "contas"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "contas_cnpj_key" ON "contas"("cnpj");
