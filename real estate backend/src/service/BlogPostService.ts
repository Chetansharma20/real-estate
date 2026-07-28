import * as BlogPostRepository from "../repositories/BlogPostRepository";
import { ApiError } from "../utils/ApiError";

/**
 * Create a new blog post (admin)
 */
export const createBlogPost = async (data: {
  title: string;
  slug: string;
  content: string;
  authorId: string;
  coverImage?: string;
  published?: boolean;
}) => {
  if (!data.title || !data.slug || !data.content || !data.authorId) {
    throw new ApiError(400, "Title, slug, content and authorId are required");
  }

  // Check slug uniqueness
  const existing = await BlogPostRepository.findBySlug(data.slug);
  if (existing) {
    throw new ApiError(400, "A blog post with this slug already exists");
  }

  return BlogPostRepository.create({
    title: data.title,
    slug: data.slug,
    content: data.content,
    coverImage: data.coverImage,
    published: data.published ?? false,
    publishedAt: data.published ? new Date() : undefined,
    author: { connect: { id: data.authorId } },
  });
};

/**
 * Get all blog posts with optional filters and pagination
 */
export const getAllBlogPosts = async (
  filters: any,
  page: number = 1,
  limit: number = 10,
  isPublic: boolean = false
) => {
  const skip = (page - 1) * limit;
  const whereClause: any = {};

  if (isPublic) {
    whereClause.published = true;
  } else if (filters.published !== undefined) {
    whereClause.published = filters.published === "true" || filters.published === true;
  }

  const [posts, totalItems] = await Promise.all([
    BlogPostRepository.findMany(whereClause, {
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    BlogPostRepository.count(whereClause),
  ]);

  return {
    posts,
    pagination: {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      limit,
    }
  };
};

/**
 * Get a single blog post by ID
 */
export const getBlogPostById = async (id: string) => {
  const post = await BlogPostRepository.findById(id);
  if (!post) {
    throw new ApiError(404, "Blog post not found");
  }
  return post;
};

/**
 * Get a single blog post by slug (public)
 */
export const getBlogPostBySlug = async (slug: string) => {
  const post = await BlogPostRepository.findBySlug(slug);
  if (!post) {
    throw new ApiError(404, "Blog post not found");
  }
  return post;
};

/**
 * Update a blog post (admin)
 */
export const updateBlogPost = async (
  id: string,
  updateData: {
    title?: string;
    slug?: string;
    content?: string;
    coverImage?: string;
    published?: boolean;
  }
) => {
  const post = await BlogPostRepository.findById(id);
  if (!post) {
    throw new ApiError(404, "Blog post not found");
  }

  // If slug is changing, check it's unique
  if (updateData.slug && updateData.slug !== post.slug) {
    const existing = await BlogPostRepository.findBySlug(updateData.slug);
    if (existing) {
      throw new ApiError(400, "A blog post with this slug already exists");
    }
  }

  const dataToUpdate: any = { ...updateData };

  // Set publishedAt if publishing for the first time
  if (updateData.published && !post.published) {
    dataToUpdate.publishedAt = new Date();
  }

  return BlogPostRepository.update(id, dataToUpdate);
};

/**
 * Delete a blog post (admin)
 */
export const deleteBlogPost = async (id: string) => {
  const post = await BlogPostRepository.findById(id);
  if (!post) {
    throw new ApiError(404, "Blog post not found");
  }
  return BlogPostRepository.deletePost(id);
};
