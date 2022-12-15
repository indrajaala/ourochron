// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    app: {
        head: {
            link: [{rel: 'icon', type: 'image/png', href: '/favicon.png'}]
        }
    },

    css: ['vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.min.css'
    ],

    build: {
        transpile: ['vuetify']
    },
    modules: [
        '@vueuse/nuxt',
    ],
    ssr: false,
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },

})
