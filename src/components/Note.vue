<script setup>
defineProps({
  id: Number,
  body: String,
  date: String,
  bg: String,
  color: String
})
</script>

<template>
  <div class="flex flex-col border rounded-2xl h-72 p-4 justify-between bg-yellow-500 text-white" :id="id">
    <p class="text-lg">{{ body }}</p>
    <p class="text-sm">{{ date }}</p>
  </div>
</template>
