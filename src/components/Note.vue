<script setup>
defineProps({
  id: Number,
  body: String,
  date: String,
  bg: String,
})
</script>

<template>
  <div class="flex flex-col relative border rounded-2xl h-72 p-4 justify-between text-white" :class="bg">
    <div :id="id" class="absolute top-2 right-2 flex opacity-0">
      <img src="/edit.svg" @click="$emit('edit', id)" alt="edit" class="icon">
      <img src="/delete.svg" @click="$emit('delete', id)" alt="delete" class="icon">
    </div>
    <p class="text-lg pt-5">{{ body }}</p>
    <p class="text-sm">{{ date }}</p>
  </div>
</template>

<style scoped>
.icon {
  @apply w-7 h-7 mr-1 cursor-pointer rounded-full hover:bg-slate-200/50;
}

div.relative:hover div.opacity-0 {
  opacity: 100;
}
</style>