<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import RandomNote from "../components/MusicalNote.svelte";
  import { getRandomNote, type Note } from "../utils/getRandomNote";

  let lastNote: number;

  let randomNote: Note = getRandomNote();

  type MidiMessage = {
    data: Uint8Array;
  };

  function handleMidiMessage(midiMessage: MidiMessage) {
    const commandType = midiMessage.data[0];
    const velocity = midiMessage.data[2];

    if (velocity > 0 && commandType >= 144 && commandType <= 159) {
      lastNote = midiMessage.data[1];
      if (lastNote === randomNote.midiValue) {
        randomNote = getRandomNote(randomNote);
      }
    }
  }

  async function getMidiDevice() {
    if (!browser) return;
    if (!("requestMIDIAccess" in navigator)) return;

    try {
      const result = await (navigator.requestMIDIAccess() as Promise<any>);

      result.inputs.forEach((input) => {
        input.onmidimessage = handleMidiMessage;
      });
    } catch (e) {
      console.log(e);
    }
  }

  onMount(() => {
    getMidiDevice();
  });
</script>

{#key randomNote}
  <RandomNote note={randomNote} />
{/key}

{#if lastNote}
  <h3>Note value: <span>{lastNote}</span></h3>
{/if}

{#if lastNote === randomNote.midiValue}
  <strong>That's correct!</strong>
{/if}
