-- CreateTable
CREATE TABLE "musics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "tone" TEXT NOT NULL,
    "isPlayed" BOOLEAN NOT NULL DEFAULT false,
    "score" INTEGER NOT NULL DEFAULT 1000,
    "counterPlays" INTEGER NOT NULL DEFAULT 0,
    "bandId" TEXT NOT NULL,
    CONSTRAINT "musics_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "bands" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "musicId" TEXT NOT NULL,
    CONSTRAINT "links_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "musics" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MusicToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "musics" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MusicToTag_AB_unique" ON "_MusicToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MusicToTag_B_index" ON "_MusicToTag"("B");
