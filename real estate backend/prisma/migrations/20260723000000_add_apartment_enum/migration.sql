-- Migration PART 1: Enum updates only (must commit before using new enum values)

-- Add APARTMENT to PropertyType enum
ALTER TYPE "PropertyType" ADD VALUE IF NOT EXISTS 'APARTMENT';
