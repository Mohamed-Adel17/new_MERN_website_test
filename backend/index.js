// Entry point for Render deployment
// This file ensures compatibility with Render's default expectations

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import and run the server
import('./server.js').catch(console.error);
