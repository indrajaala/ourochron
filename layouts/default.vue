<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon class="d-lg-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
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
          <v-list-item prepend-icon="mdi-calendar" title="Year" value="Year"></v-list-item>
        </nuxt-link>
        <nuxt-link no-prefetch to="/sun-rise-set">
          <v-list-item prepend-icon="mdi-white-balance-sunny" title="sun rise and set"
                       value="sun rise and set"></v-list-item>
        </nuxt-link>
        <nuxt-link no-prefetch to="/moon-rise-set">
          <v-list-item prepend-icon="mdi-moon-full" title="moon rise and set" value="moon rise and set"></v-list-item>
        </nuxt-link>
        <nuxt-link no-prefetch to="/moon-phases">
          <v-list-item prepend-icon="mdi-moon-waxing-crescent" title="moon phases" value="moon-phases"></v-list-item>
        </nuxt-link>
      </v-list>

    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>
<script setup>
import {useTheme} from 'vuetify'
import {bColor, tColor} from "@/stores/ourochron";

const theme = useTheme();
const themeIndicator = ref('light');
const drawer = ref(null);


function onClick() {
  themeIndicator.value = localStorage.getItem("theme") === 'light' ? 'dark' : 'light';
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  localStorage.setItem("theme", theme.global.name.value);
}

onMounted(() => {
  // localStorage.setItem("theme", theme.global.name.value);
  if (localStorage.getItem("theme")) {
    theme.global.name.value = localStorage.getItem("theme");
    themeIndicator.value = localStorage.getItem("theme");
  }
})

onMounted(() => {
  watch(theme.global.name, () => {

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

</script>


<style>

a {
  text-decoration: none;
}

.cardinal-points{
  background-color: v-bind(bColor)!important;
  border:1px solid v-bind(bColor)!important;
  z-index: 10!important;
}
body {
  overflow-x: scroll;
}
</style>