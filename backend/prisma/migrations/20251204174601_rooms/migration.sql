-- CreateTable
CREATE TABLE "Rooms" (
    "roomId" INTEGER NOT NULL,
    "limit" INTEGER NOT NULL,
    "adminPlay" BOOLEAN NOT NULL,
    "isChatOpen" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("roomId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_userId_key" ON "Rooms"("userId");

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
