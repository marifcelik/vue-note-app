<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: Number,
  text: String,
  date: [Date, String],
  bg: String,
})

const d = computed(() => new Date(props.date))
</script>

<template>
  <div :id="id" class="flex flex-col relative border rounded-2xl h-72 p-4 justify-between text-white whitespace-pre-line" :class="bg">
    <div class="absolute top-2 right-2 flex opacity-0">
      <img src="/edit.svg" @click="$emit('edit', id)" alt="edit" class="icon">
      <img src="/delete.svg" @click="$emit('delete', id)" alt="delete" class="icon">
    </div>
    <p class="text-lg pt-5">{{ text }}</p>
    <p class="text-sm">{{ d.toLocaleDateString('tr-TR') + ' - ' + d.toLocaleTimeString('tr-TR', { timeStyle: 'short' }) }}</p>
  </div>
</template>

<style lang="postcss" scoped>
.icon {
  @apply w-7 h-7 mr-1 cursor-pointer rounded-full hover:bg-slate-200/50;
}

.relative:hover .opacity-0 {
  opacity: 100;
}

.whitespace-pre-line {
  hyphens: auto;
}
</style>