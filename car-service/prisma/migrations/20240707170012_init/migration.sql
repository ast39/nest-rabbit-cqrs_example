-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "cqrs_cars";

-- CreateTable
CREATE TABLE "cqrs_cars"."cars" (
    "car_id" SERIAL NOT NULL,
    "car_mark" VARCHAR(128) NOT NULL,
    "car_model" VARCHAR(128) NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "cqrs_cars"."user_cars" (
    "car_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_cars_pkey" PRIMARY KEY ("car_id","user_id")
);

-- AddForeignKey
ALTER TABLE "cqrs_cars"."user_cars" ADD CONSTRAINT "user_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cqrs_cars"."cars"("car_id") ON DELETE CASCADE ON UPDATE CASCADE;
