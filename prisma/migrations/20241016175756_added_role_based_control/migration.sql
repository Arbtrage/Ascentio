-- CreateTable
CREATE TABLE "RoleEntity" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoleEntity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scope" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "description" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleScope" (
    "id" STRING NOT NULL,
    "roleId" STRING NOT NULL,
    "scopeId" STRING NOT NULL,

    CONSTRAINT "RoleScope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "roleId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectsId" STRING,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" STRING NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoleEntity_name_key" ON "RoleEntity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Scope_name_key" ON "Scope"("name");

-- AddForeignKey
ALTER TABLE "RoleScope" ADD CONSTRAINT "RoleScope_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "RoleEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleScope" ADD CONSTRAINT "RoleScope_scopeId_fkey" FOREIGN KEY ("scopeId") REFERENCES "Scope"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "RoleEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_projectsId_fkey" FOREIGN KEY ("projectsId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
