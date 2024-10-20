/*
  Warnings:

  - The values [USER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `projectsId` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the `RoleEntity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoleScope` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Scope` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MEMBER';
ALTER TYPE "Role"DROP VALUE 'USER';

-- DropForeignKey
ALTER TABLE "RoleScope" DROP CONSTRAINT "RoleScope_roleId_fkey";

-- DropForeignKey
ALTER TABLE "RoleScope" DROP CONSTRAINT "RoleScope_scopeId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_projectsId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "projectsId";
ALTER TABLE "UserRole" DROP COLUMN "roleId";

-- DropTable
DROP TABLE "RoleEntity";

-- DropTable
DROP TABLE "RoleScope";

-- DropTable
DROP TABLE "Scope";
