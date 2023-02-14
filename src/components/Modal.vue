<script setup>
import { computed, ref, watchEffect } from 'vue';

// didn't work
// const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'violet', 'blue'].map(v => `bg-${v}-500`)
const colors = ['bg-red-500', 'bg-orange-400', 'bg-amber-300', 'bg-emerald-300', 'bg-teal-400', 'bg-cyan-400', 'bg-violet-500']

const text = ref('');
const textRef = ref(null);
const select = ref(0);

const selectedColor = computed(() => colors[select.value])

const emit = defineEmits(['addNote', 'closeModal'])
defineProps({ show: { type: Boolean, required: true }, Note: {} })

watchEffect(() => textRef.value && setTimeout(() => textRef.value.focus(), 200))

function emitAddNote() {
  const data = { text: text.value, bg: selectedColor.value }
  emit('addNote', data);
  text.value = '';
}

function emitCloseModal() {
  emit('closeModal');
  text.value = '';
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" id="overlay" @click="emitCloseModal" @keyup.esc="emitCloseModal" class="modal-mask absolute top-0 left-0 flex w-full h-full bg-neutral-900/70 z-10">
      <div @click.stop="" class="modal-container flex flex-col relative m-auto w-[48rem] h-96 border-none rounded-xl p-7" :class="selectedColor">
        <div class="flex items-center justify-between w-1/2 m-auto">
          <label v-for="color, index in colors" :key="index" class="w-6 h-6 rounded-full">
            <input type="radio" :value="index" v-model="select" :class="color" @mousedown.prevent="" class="appearance-none transition-all w-full h-full rounded-full cursor-pointer border checked:border-4 checked:border-white">
          </label>
        </div>
        <textarea ref="textRef" v-model="text" @keyup.ctrl.enter="emitAddNote" class="h-full p-4 mt-3 border-2 rounded-xl resize-none outline-none" autofocus></textarea>
        <div class="w-1/2 mx-auto mt-3 flex justify-between">
          <button @click="emitAddNote" class="btn bg-blue-500">save</button>
          <button @click="emitCloseModal" class="btn bg-red-500">close</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="postcss" scoped>
.btn {
  @apply p-3 text-2xl rounded-xl text-white w-1/2 mx-3 border;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-container {
  transition: all 0.3s ease;
}

.modal-enter-from .modal-container {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to .modal-container {
  opacity: 0;
  transform: scale(0.9);
}
</style>
