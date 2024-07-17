import { Prisma, Car } from '@prisma/client';

export interface ICar extends Car {}

export type ICarCreate = Prisma.CarCreateInput;
export type ICarUpdate = Prisma.CarUpdateInput;
export type ICarFilter = Prisma.CarWhereInput;
export type ICarUnique = Prisma.CarWhereUniqueInput;
export type ICarOrder = Prisma.CarOrderByWithRelationInput;
