/*
  Warnings:

  - You are about to drop the column `artistId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `artistName` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `shareUrl` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `shortUrl` on the `Album` table. All the data in the column will be lost.
  - Added the required column `artist_id` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artist_name` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shareurl` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shorturl` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "artistId",
DROP COLUMN "artistName",
DROP COLUMN "shareUrl",
DROP COLUMN "shortUrl",
ADD COLUMN     "artist_id" TEXT NOT NULL,
ADD COLUMN     "artist_name" TEXT NOT NULL,
ADD COLUMN     "shareurl" TEXT NOT NULL,
ADD COLUMN     "shorturl" TEXT NOT NULL;
