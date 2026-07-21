-- CreateTable
CREATE TABLE "public"."Horaire" (
    "id" SERIAL NOT NULL,
    "jour" TEXT NOT NULL,
    "heureDebut" TEXT NOT NULL,
    "heureFin" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Horaire_pkey" PRIMARY KEY ("id")
);
