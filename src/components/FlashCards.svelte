<script lang="ts">
  import { onDestroy } from "svelte";
  import { getRandomNote } from "../utils/getRandomNote";
  import type { Note } from "../utils/musicalNotes";
  import { lastPlayedNote } from "../utils/stores/midiNote";
  import MusicalNote from "./MusicalNote.svelte";

  export let notes: Note[];
  let randomNote: Note = getRandomNote(notes);
  let totalNotes = -1;
  let totalCorrect = 0;
  let correctPercentage = 100;
  let previousNoteCorrect: boolean | undefined;

  const lastPlayNoteUnsub = lastPlayedNote.subscribe((val) => {
    if (val === randomNote.midiValue) {
      previousNoteCorrect = true;
      totalCorrect++;
    } else if (totalNotes > 0) {
      previousNoteCorrect = false;
    }

    totalNotes++;
    correctPercentage =
      totalCorrect === totalNotes
        ? 100
        : Math.round((totalCorrect / totalNotes) * 100);
    randomNote = getRandomNote(notes, randomNote);
  });

  onDestroy(lastPlayNoteUnsub);
</script>

<div class="container">
  <header>
    <div
      class={previousNoteCorrect === undefined
        ? ""
        : previousNoteCorrect
        ? "green"
        : "red"}
    >
      <span>Correct:</span>
      <span>{totalCorrect}/{totalNotes} {correctPercentage}%</span>
    </div>
  </header>
  {#key randomNote}
    <MusicalNote note={randomNote} />
  {/key}
</div>

<style>
  .container {
    width: 100vw;
    height: 100vh;
  }

  header {
    padding: 1em;
  }

  header > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  header > div.green {
    color: green;
  }

  header > div.red {
    color: firebrick;
  }
</style>
