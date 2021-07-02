-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "restaurantId" TEXT NOT NULL,
    "addressNumber" TEXT,
    "addressStreet" TEXT,
    "city" TEXT,
    "country" TEXT,
    "postalCode" TEXT,
    "state" TEXT,
    FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("id", "restaurantId", "addressNumber", "addressStreet", "city", "country", "postalCode", "state") SELECT "id", "restaurantId", "addressNumber", "addressStreet", "city", "country", "postalCode", "state" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE UNIQUE INDEX "Address.restaurantId_unique" ON "Address"("restaurantId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
