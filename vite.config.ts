import vue from  '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {defineConfig, loadEnv} from "vite";
import dts from 'vite-plugin-dts'
import {viteCommonjs} from "@originjs/vite-plugin-commonjs";
import libCss from 'vite-plugin-libcss'
import {fileURLToPath, URL} from "url";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd())
    const config = {
        plugins:[
            vue(),
            dts({
                outDir: './dist/type',
                rollupTypes: false
            }),
            vueJsx(),
            viteCommonjs(),
            libCss()
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            open: true
        },
        assetsInclude: ['**/*.md']
    }
    if(env.VITE_APP_RELEASE) {
        return {
            ...config,
            build: {
                lib: {
                    entry: fileURLToPath(new URL('./src/release/index.ts', import.meta.url)),
                    name: 'low-form',
                    fileName: 'low-form'
                },
                rollupOptions: {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue'
                    }
                }
            }
            }
        }
    }
    return config
})
