-- CreateTable
CREATE TABLE "Songs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "artist_id" TEXT NOT NULL,
    "artist_name" TEXT NOT NULL,
    "artist_idstr" TEXT NOT NULL,
    "album_name" TEXT NOT NULL,
    "album_id" TEXT NOT NULL,
    "license_ccurl" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "releasedate" TEXT NOT NULL,
    "album_image" TEXT NOT NULL,
    "audio" TEXT NOT NULL,
    "audiodownload" TEXT NOT NULL,
    "prourl" TEXT NOT NULL,
    "shorturl" TEXT NOT NULL,
    "shareurl" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "audiodownload_allowed" BOOLEAN NOT NULL,
    "content_id_free" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Songs_pkey" PRIMARY KEY ("id")
);
