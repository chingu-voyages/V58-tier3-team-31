import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Helper function to conditionally combine class names/styles.
 * Uses clsx for conditional grouping and twMerge for resolving Tailwind CSS conflicts.
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
