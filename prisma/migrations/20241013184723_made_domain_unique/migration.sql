/*
  Warnings:

  - A unique constraint covering the columns `[domain]` on the table `Organisation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Organisation_domain_key" ON "Organisation"("domain");
