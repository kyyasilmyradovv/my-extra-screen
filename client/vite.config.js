import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .dev.env for dev mode, .env for production
  const envFile = mode === 'development' ? '.dev.env' : '.env';
  const envPath = path.resolve(process.cwd(), envFile);

  // Load environment variables
  let env = {};
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  }

  // Load default Vite env files (.env, .env.local, etc.)
  const viteEnv = loadEnv(mode, process.cwd(), '');

  // Merge: custom env file (.dev.env or .env) takes precedence over default Vite env
  const mergedEnv = { ...viteEnv, ...env };

  // Set environment variables for Vite to pick up
  // Vite automatically exposes VITE_* prefixed variables via import.meta.env
  Object.assign(process.env, mergedEnv);

  return {
    plugins: [react()],
    // Vite automatically exposes VITE_* variables to the client
    envPrefix: 'VITE_',
  };
});
