import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

/**
 * Create a new blog post
 */
export const create = async (data: Prisma.BlogPostCreateInput) => {
  return prisma.blogPost.create({
    data,
  });
};

/**
 * Find a blog post by ID
 */
export const findById = async (id: string) => {
  return prisma.blogPost.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

/**
 * Find a blog post by unique slug
 */
export const findBySlug = async (slug: string) => {
  return prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

/**
 * Find multiple blog posts with optional filters and pagination
 */
export const findMany = async (
  whereClause?: Prisma.BlogPostWhereInput,
  options?: { skip?: number; take?: number; orderBy?: Prisma.BlogPostOrderByWithRelationInput }
) => {
  return prisma.blogPost.findMany({
    where: whereClause,
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    ...options,
  });
};

/**
 * Count blog posts matching a criteria
 */
export const count = async (whereClause?: Prisma.BlogPostWhereInput) => {
  return prisma.blogPost.count({
    where: whereClause,
  });
};

/**
 * Update a blog post
 */
export const update = async (id: string, data: Prisma.BlogPostUpdateInput) => {
  return prisma.blogPost.update({
    where: { id },
    data,
  });
};

/**
 * Delete a blog post
 */
export const deletePost = async (id: string) => {
  return prisma.blogPost.delete({
    where: { id },
  });
};
