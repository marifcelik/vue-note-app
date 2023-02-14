<script setup>
import { onMounted, ref } from 'vue';
import Note from './components/Note.vue';
import Modal from './components/Modal.vue';
import NoteC from './class/NoteC';

let id = 0;

const add = ref(null);
const showModal = ref(false);
const notes = ref([new NoteC(id++, 'lorem ipsum dolor sit amet', new Date(), 'bg-purple-500')]);

onMounted(() => {
  const data = JSON.parse(localStorage.getItem('notes') ?? '[]');
  if (data.length) {
    id = data[0].id;
    notes.value = data
  }
})

function addNote({ text, bg }) {
  const newNote = new NoteC(id++, text, new Date(), bg);
  notes.value.push(newNote);
  localStorage.setItem('notes', JSON.stringify(notes.value));
  showModal.value = false;
}

// TODO: edit event and edit note
function emitEdit() {
  
}

function editNote(id) {
  
}

function deleteNote(id) {
  notes.value = notes.value.filter(v => v.id !== id)
  localStorage.setItem('notes', JSON.stringify(notes.value));
}
</script>

<template>
  <Teleport to="body">
    <Modal :show="showModal" @addNote="addNote" @closeModal="showModal = false" />
  </Teleport>
  <div class="w-full max-w-[90rem] mx-auto pt-10">
    <header class="w-full flex items-center justify-between px-6 text-4xl">
      <h1 class="font-bold">Notes</h1>
      <button ref="add" @click.stop="showModal = true" class="relative rounded-full w-10 h-10 hover:bg-violet-100 transition-colors">
        <p class="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-6">+</p>
      </button>
    </header>
    <!-- TODO: add autoanimate plugin -->
    <div class="grid grid-cols-5 w-full mt-9 gap-5">
      <!-- TODO: add edit and remove features -->
      <Note v-for="note in notes" v-bind="note" :key="note.id" @edit="emitEdit" @delete="deleteNote" />
    </div>
  </div>
</template>
