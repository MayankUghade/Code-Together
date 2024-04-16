/*
  Warnings:

  - You are about to drop the column `Tags` on the `Room` table. All the data in the column will be lost.
  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "Tags",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL;
