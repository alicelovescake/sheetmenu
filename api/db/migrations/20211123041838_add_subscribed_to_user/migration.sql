-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Restaurant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "sheetId" TEXT NOT NULL,
    "brandColor" TEXT NOT NULL,
    "theme" TEXT,
    "domain" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Restaurant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Restaurant" ("brandColor", "createdAt", "domain", "id", "name", "ownerId", "sheetId", "theme", "updatedAt") SELECT "brandColor", "createdAt", "domain", "id", "name", "ownerId", "sheetId", "theme", "updatedAt" FROM "Restaurant";
DROP TABLE "Restaurant";
ALTER TABLE "new_Restaurant" RENAME TO "Restaurant";
CREATE UNIQUE INDEX "Restaurant_ownerId_key" ON "Restaurant"("ownerId");
CREATE UNIQUE INDEX "Restaurant_domain_key" ON "Restaurant"("domain");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "name" TEXT,
    "stripeId" TEXT,
    "stripeSubscriptionid" TEXT,
    "subscribed" BOOLEAN NOT NULL DEFAULT false,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "firebaseId", "id", "name", "onboarded", "stripeId", "stripeSubscriptionid", "updatedAt") SELECT "createdAt", "email", "firebaseId", "id", "name", "onboarded", "stripeId", "stripeSubscriptionid", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
