/*
  Warnings:

  - The primary key for the `PlaylistSongs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PlaylistSongs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[songId]` on the table `PlaylistSongs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PlaylistSongs" DROP CONSTRAINT "PlaylistSongs_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PlaylistSongs_pkey" PRIMARY KEY ("playlistId", "songId");

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistSongs_songId_key" ON "PlaylistSongs"("songId");
