<template>
  <v-switch class="px-3" v-model="enableCurrent" color="primary" :label="label"></v-switch>
</template>

<script setup>

const props = defineProps({
  label: {
    type: String,
  },
  el: {
    type: String
  }
})
const enableCurrent = ref(true);
watch(enableCurrent, () => {
  const el = document.querySelector(`#${props.el}`);
  if (enableCurrent.value === false) {
    el.classList.remove(props.el);
  }
  if (enableCurrent.value === true) {
    el.classList.add(props.el);
  }
})


</script>

<style scoped>

</style>