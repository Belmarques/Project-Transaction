-- CreateTable
CREATE TABLE "conta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpf" TEXT,
    "cnpj" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "conta_cpf_key" ON "conta"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "conta_cnpj_key" ON "conta"("cnpj");
