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
          <v-list-item prepend-icon="mdi-link-box" title="Year" value="Year"></v-list-item>
        </nuxt-link>
        <nuxt-link no-prefetch to="/sun-rise-set">
          <v-list-item prepend-icon="mdi-link-box" title="sun" value="sun"></v-list-item>
        </nuxt-link>
        <nuxt-link no-prefetch to="/moon-rise-set">
          <v-list-item prepend-icon="mdi-link-box" title="moon" value="moon"></v-list-item>
        </nuxt-link>
        <nuxt-link no-prefetch to="/moon-phases">
          <v-list-item prepend-icon="mdi-link-box" title="moon-phases" value="moon-phases"></v-list-item>
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
</script>

<style>
a {
  text-decoration: none;
}

html {
  --b-color: black;
}

html[data-theme='dark'] {
  --b-color: white;
}
</style>