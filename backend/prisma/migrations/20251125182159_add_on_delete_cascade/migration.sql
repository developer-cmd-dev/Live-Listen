-- DropForeignKey
ALTER TABLE "PlaylistSongs" DROP CONSTRAINT "PlaylistSongs_playlistId_fkey";

-- AddForeignKey
ALTER TABLE "PlaylistSongs" ADD CONSTRAINT "PlaylistSongs_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
