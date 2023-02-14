<script setup>
import { computed, ref, watchEffect } from 'vue';
import NoteC from '../class/NoteC';

const props = defineProps({ show: Boolean, edit: { type: Object, validator: value => value instanceof NoteC } })
const emit = defineEmits(['addNote', 'editNote', 'closeModal'])

// didn't work
// const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'cyan', 'violet', 'blue'].map(v => `bg-${v}-500`)
const colors = ['bg-red-500', 'bg-orange-400', 'bg-amber-300', 'bg-emerald-300', 'bg-teal-400', 'bg-cyan-400', 'bg-violet-500']

const text = ref('');
const textRef = ref(null);
const select = ref(0);

const selectedColor = computed(() => colors[select.value])

watchEffect(() => {
  textRef.value && setTimeout(() => textRef.value.focus(), 200)
  if (props.edit) {
    text.value = props.edit.text
    select.value = colors.findIndex((v) => v === props?.edit.bg)
  } else {
    text.value = '';
    select.value = 0;
  }
})

function emitSave() {
  const data = { text: text.value, bg: selectedColor.value }
  const emitType = props.edit ? 'editNote' : 'addNote';
  emit(emitType, data);
  text.value = '';
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" id="overlay" @click="emit('closeModal')" @keyup.esc="emit('closeModal')" class="modal-mask absolute top-0 left-0 flex w-full h-full bg-neutral-900/70 z-10">
      <div @click.stop="" class="modal-container flex flex-col relative m-auto w-[48rem] h-96 border-none rounded-xl p-7" :class="selectedColor">
        <div class="flex items-center justify-between w-1/2 m-auto">
          <label v-for="color, index in colors" :key="index" class="w-6 h-6 rounded-full">
            <input type="radio" :value="index" v-model="select" :class="color" @mousedown.prevent="" class="appearance-none transition-all w-full h-full rounded-full cursor-pointer border checked:border-4 checked:border-white">
          </label>
        </div>
        <textarea ref="textRef" v-model="text" @keyup.ctrl.enter="emitSave" class="h-full p-4 mt-3 border-2 rounded-xl resize-none outline-none" autofocus></textarea>
        <div class="w-1/2 mx-auto mt-3 flex justify-between">
          <button @click="emitSave" class="btn bg-blue-500">save</button>
          <button @click="emit('closeModal')" class="btn bg-red-500">close</button>
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
