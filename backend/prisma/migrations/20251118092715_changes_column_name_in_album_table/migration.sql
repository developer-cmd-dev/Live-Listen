/*
  Warnings:

  - Changed the type of `zip_allowed` on the `Album` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "zip_allowed",
ADD COLUMN     "zip_allowed" BOOLEAN NOT NULL;
