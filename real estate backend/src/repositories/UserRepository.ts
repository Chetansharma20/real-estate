import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const findById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findByPhone = async (phone: string) => {
  return prisma.user.findUnique({
    where: { phone },
  });
};

export const findFirst = async (whereClause: Prisma.UserWhereInput) => {
  return prisma.user.findFirst({
    where: whereClause,
  });
};

export const findMany = async (
  whereClause?: Prisma.UserWhereInput,
  options?: { skip?: number; take?: number; orderBy?: Prisma.UserOrderByWithRelationInput }
) => {
  return prisma.user.findMany({
    where: whereClause,
    ...options,
  });
};

export const create = async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({
    data,
  });
};

export const update = async (id: string, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
