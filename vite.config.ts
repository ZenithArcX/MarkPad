import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import { resolve } from 'path'

/**
 * electronHtmlFix
 *
 * WHY THIS EXISTS:
 * Vite's production build injects `crossorigin` on every <script type="module">
 * and <link rel="modulepreload"> tag. This attribute tells the browser to fetch
 * those resources in CORS mode.
 *
 * In Electron, loadFile() uses the `file://` protocol. A `file://` server cannot
 * return CORS headers — there is no server. So every crossorigin fetch fails with a
 * CORS error and the scripts are silently never executed → blank white screen.
 *
 * Fix: strip all `crossorigin` attributes from the final HTML before packaging.
 * This is safe because Electron's renderer is a single-origin local app; there is no
 * cross-origin resource that needs CORS enforcement.
 */
function electronHtmlFix(): Plugin {
  return {
    name: 'electron-html-fix',
    enforce: 'post',
    transformIndexHtml(html: string): string {
      return html.replace(/ crossorigin/g, '');
    },
  };
}

export default defineConfig(({ mode }) => ({
  // base: './' is CRITICAL for Electron production.
  // Without it, Vite emits absolute asset paths (/assets/xxx.js) inside JS chunks.
  // Dynamic import('/assets/xxx.js') resolves to app:///assets/xxx.js (wrong host).
  // With './', dynamic imports are relative and resolve correctly under app://./
  base: './',
  plugins: [
    react(),
    electronHtmlFix(),
    electron([
      {
        entry: 'electron/main.ts',
        vite: {
          build: {
            sourcemap: mode !== 'production',
            minify: mode === 'production',
          },
        },
      },
      {
        entry: 'electron/preload.ts',
        onstart(options) {
          options.reload();
        },
        vite: {
          build: {
            lib: {
              entry: 'electron/preload.ts',
              formats: ['cjs'],
            },
            rollupOptions: {
              output: {
                entryFileNames: '[name].cjs',
              },
            },
            sourcemap: mode !== 'production',
            minify: false, // Don't minify preload to avoid wrapping issues
          },
        },
      },
    ]),
    renderer(),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  build: {
    sourcemap: mode !== 'production',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@codemirror') || id.includes('@lezer') || id.includes('@uiw')) {
            return 'codemirror';
          }
          if (id.includes('node_modules/react-markdown') || id.includes('remark') || id.includes('rehype')) {
            return 'markdown';
          }
        },
      },
    },
  },
}));
