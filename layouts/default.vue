<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon class="d-lg-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="app-title" @click="goHome">
        <v-icon icon="mdi-infinity"></v-icon>
        ourochron
      </v-app-bar-title>

      <v-btn
          :prepend-icon="themeIndicator === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="onClick"
      ></v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <nuxt-link no-prefetch to="/">
          <v-list-item :active="$route.path === '/'"  prepend-icon="mdi-calendar" title="Year" value="Year"></v-list-item>
        </nuxt-link>
        <nuxt-link no-prefetch to="/sun-rise-set">
          <v-list-item :active="$route.path === '/sun-rise-set'" prepend-icon="mdi-white-balance-sunny" title="sun rise and set"
                       value="sun rise and set"></v-list-item>
        </nuxt-link>
        <nuxt-link no-prefetch to="/moon-rise-set">
          <v-list-item :active="$route.path === '/moon-rise-set'" prepend-icon="mdi-moon-full" title="moon rise and set" value="moon rise and set"></v-list-item>
        </nuxt-link>
        <nuxt-link no-prefetch to="/moon-phases">
          <v-list-item :active="$route.path === '/moon-phases'" prepend-icon="mdi-moon-waxing-crescent" title="moon phases" value="moon-phases"></v-list-item>
        </nuxt-link>
      </v-list>

    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>
<script setup>
const router = useRouter();
import {useTheme} from 'vuetify'
import {bColor, tColor} from "@/stores/ourochron";
import {useStorage} from "@vueuse/core";


const theme = useTheme();
const themeIndicator = ref('light');
const drawer = ref(null);
const currentTheme = useStorage("currentTheme", theme.global.name.value);



function onClick() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  currentTheme.value = theme.global.name.value;
  themeIndicator.value = currentTheme.value;
}

onMounted(() => {
  if (currentTheme.value) {
    theme.global.name.value = currentTheme.value;
    themeIndicator.value = currentTheme.value;
  }
})

onMounted(() => {
  watchEffect( () => {

    if (theme.global.name.value === "light") {
      bColor.value = 'black';
      tColor.value = "white";
    }
    if (theme.global.name.value === "dark") {
      bColor.value = 'darkgrey';
      tColor.value = 'black';
    }
  })
})

function goHome(){
  router.push({path:"/"})
}

</script>


<style>

a {
  text-decoration: none;
}

.cardinal-points{
  background-color: v-bind(bColor)!important;
  border:1px solid v-bind(bColor)!important;
  z-index: 1!important;
}
body {
  overflow-x: scroll;
}

.app-title{
  cursor: pointer;
}
</style>