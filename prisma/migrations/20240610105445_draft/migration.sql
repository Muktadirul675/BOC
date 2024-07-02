-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DraftArticle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "coverImage" TEXT,
    "authorEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'unpublished',
    "subjects" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DraftArticle_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DraftArticle" ("authorEmail", "content", "coverImage", "createdAt", "id", "status", "subjects", "tags", "title", "updatedAt") SELECT "authorEmail", "content", "coverImage", "createdAt", "id", "status", "subjects", "tags", "title", "updatedAt" FROM "DraftArticle";
DROP TABLE "DraftArticle";
ALTER TABLE "new_DraftArticle" RENAME TO "DraftArticle";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
