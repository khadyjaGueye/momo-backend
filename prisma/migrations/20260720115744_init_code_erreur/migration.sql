-- CreateTable
CREATE TABLE "public"."CodeErreur" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "signification" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "CodeErreur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CodeErreur_code_key" ON "public"."CodeErreur"("code");
