/*
  Warnings:

  - You are about to drop the column `creationdate` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `shareurl` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `shorturl` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `Playlist` table. All the data in the column will be lost.
  - Added the required column `playlist_name` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `private` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Playlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "creationdate",
DROP COLUMN "name",
DROP COLUMN "shareurl",
DROP COLUMN "shorturl",
DROP COLUMN "user_id",
DROP COLUMN "user_name",
DROP COLUMN "zip",
ADD COLUMN     "playlist_name" TEXT NOT NULL,
ADD COLUMN     "private" BOOLEAN NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_PlaylistSongs" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PlaylistSongs_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PlaylistSongs_B_index" ON "_PlaylistSongs"("B");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistSongs" ADD CONSTRAINT "_PlaylistSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistSongs" ADD CONSTRAINT "_PlaylistSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "Songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
