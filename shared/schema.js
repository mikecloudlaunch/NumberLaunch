// Shared schema module for Vercel deployment
// This redirects to the compiled schema.js when used in production

// In production environment, the TS files will be compiled to JS
export * from './schema.ts';