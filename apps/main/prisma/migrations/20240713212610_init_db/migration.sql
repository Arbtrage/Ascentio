-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING,
    "profilePhoto" STRING,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
