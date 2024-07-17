-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "cqrs_users";

-- CreateTable
CREATE TABLE "cqrs_users"."users" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(128),
    "user_email" VARCHAR(128),
    "user_phone" VARCHAR(128),
    "car_counter" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);
