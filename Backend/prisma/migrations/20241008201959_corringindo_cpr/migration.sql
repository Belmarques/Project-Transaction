-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpfOrCnpj" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_contas" ("cpfOrCnpj", "email", "id", "name", "password", "status", "type") SELECT "cpfOrCnpj", "email", "id", "name", "password", "status", "type" FROM "contas";
DROP TABLE "contas";
ALTER TABLE "new_contas" RENAME TO "contas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
