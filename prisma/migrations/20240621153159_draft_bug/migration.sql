/*
  Warnings:

  - You are about to drop the column `subjects` on the `DraftArticle` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `DraftArticle` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_DraftArticleToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DraftArticleToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "DraftArticle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DraftArticleToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DraftArticleToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DraftArticleToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "DraftArticle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DraftArticleToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DraftArticle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "coverImage" TEXT,
    "authorEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unpublished',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DraftArticle_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DraftArticle" ("authorEmail", "content", "coverImage", "createdAt", "id", "status", "title", "updatedAt") SELECT "authorEmail", "content", "coverImage", "createdAt", "id", "status", "title", "updatedAt" FROM "DraftArticle";
DROP TABLE "DraftArticle";
ALTER TABLE "new_DraftArticle" RENAME TO "DraftArticle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_DraftArticleToSubject_AB_unique" ON "_DraftArticleToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_DraftArticleToSubject_B_index" ON "_DraftArticleToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DraftArticleToTopic_AB_unique" ON "_DraftArticleToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_DraftArticleToTopic_B_index" ON "_DraftArticleToTopic"("B");
