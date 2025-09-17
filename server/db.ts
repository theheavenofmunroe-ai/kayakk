import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Handle missing DATABASE_URL gracefully for deployment
let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

if (process.env.DATABASE_URL) {
  // Configure pool with better connection settings for NEON
  pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    max: 20, // Maximum connections in pool
    idleTimeoutMillis: 30000, // Close idle connections after 30s
    connectionTimeoutMillis: 10000, // Connection timeout 10s
    maxUses: 7500, // Maximum uses before connection is closed
    allowExitOnIdle: true, // Allow process to exit when all connections idle
  });
  
  db = drizzle({ client: pool, schema });
  
  // Add connection event handlers
  pool.on('connect', (client) => {
    console.log('New database client connected');
  });
  
  pool.on('error', (err, client) => {
    console.error('Database pool error:', err.message);
    // Don't exit process on database errors
  });
  
  console.log('Database connected successfully with improved connection handling');
} else {
  console.warn('DATABASE_URL not found. Running without database connection. Some features may not work.');
}

// Enhanced database query wrapper with retry logic
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      const isConnectionError = 
        error?.code === '57P01' || // terminated by administrator
        error?.code === 'ECONNRESET' || 
        error?.code === 'ENOTFOUND' ||
        error?.message?.includes('Connection terminated') ||
        error?.message?.includes('connection closed');
        
      if (isConnectionError && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`Database connection error (attempt ${attempt}/${maxRetries}): ${error.message}. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // If not a connection error or max retries reached, throw the error
      throw error;
    }
  }
  
  throw new Error('Maximum retries reached');
}

export { pool, db };
