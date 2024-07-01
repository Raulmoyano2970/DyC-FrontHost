import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Icons from 'unplugin-icons/vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://dy-c-back-host.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [
    react(),
    Icons()
  ]
});



// {
//   "rewrites": [
//     {
//       "source": "/api/(.*)",
//       "destination": "https://dy-c-back-host.vercel.app/api/$1"
//     },
//     {
//       "source": "/(.*)",
//       "destination": "/index.html"
//     }
//   ]
// }