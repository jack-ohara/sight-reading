<script lang="ts">
  import { onDestroy } from "svelte";
  import { getRandomNote } from "../utils/getRandomNote";
  import type { Note } from "../utils/musicalNotes";
  import { lastPlayedNote } from "../utils/stores/midiNote";
  import MusicalNote from "./MusicalNote.svelte";

  export let notes: Note[];
  let randomNote: Note = getRandomNote(notes);

  const lastPlayNoteUnsub = lastPlayedNote.subscribe((val) => {
    if (val === randomNote.midiValue) {
      randomNote = getRandomNote(notes, randomNote);
    }
  });

  onDestroy(lastPlayNoteUnsub);
</script>

<div class="container">
  {#key randomNote}
    <MusicalNote note={randomNote} />
  {/key}
</div>

<style>
  .container {
    width: 100vw;
    height: 100vh;
  }
</style>
