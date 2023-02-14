<script setup>
import { onMounted, ref } from 'vue';
import Note from './components/Note.vue';
import Modal from './components/Modal.vue';
import NoteC from './class/NoteC';

const id = ref(0);
const add = ref(null);
const showModal = ref(false);
const notes = ref([]);
const edit = ref(null);

onMounted(() => {
  let data = JSON.parse(localStorage.getItem('notes'));
  if (data?.length > 0) {
    data = data.map(value => {
      const { id, text, date, bg } = value
      return new NoteC(id, text, date, bg);
    });
    id.value = data[data.length - 1].id + 1;
    notes.value = data
  }
})

function addNote({ text, bg }) {
  const newNote = new NoteC(id.value++, text, new Date(), bg);
  notes.value.push(newNote);
  localStorage.setItem('notes', JSON.stringify(notes.value));
  showModal.value = false;
}

function emitEdit(id) {
  edit.value = notes.value.find(v => v.id == id);
  showModal.value = true;
}

function editNote({ text, bg }) {
  const data = new NoteC(edit.value.id, text, new Date(), bg);
  notes.value[notes.value.findIndex(v => v == edit.value)] = data
  localStorage.setItem('notes', JSON.stringify(notes.value));
  showModal.value = false;
}

function deleteNote(id) {
  notes.value = notes.value.filter(v => v.id !== id)
  localStorage.setItem('notes', JSON.stringify(notes.value));
}
</script>

<template>
  <Teleport to="body">
    <Modal :show="showModal" :edit="edit" @addNote="addNote" @editNote="editNote" @closeModal="showModal = false" />
  </Teleport>
  <div class="w-full max-w-[90rem] mx-auto pt-10">
    <header class="w-full flex items-center justify-between px-6 text-4xl">
      <h1 class="font-bold">Notes</h1>
      <button ref="add" @click.stop="edit = null; showModal = true" class="relative rounded-full w-10 h-10 hover:bg-violet-100 transition-colors">
        <p class="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-6">+</p>
      </button>
    </header>
    <div v-auto-animate class="grid grid-cols-5 w-full mt-9 gap-5">
      <Note v-for="note in notes" v-bind="note" :key="note.id" @edit="emitEdit" @delete="deleteNote" />
    </div>
  </div>
</template>
