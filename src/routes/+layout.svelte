<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { lastPlayedNote } from "../utils/stores/midiNote";

  type MidiMessage = {
    data: Uint8Array;
  };

  function handleMidiMessage(midiMessage: MidiMessage) {
    const commandType = midiMessage.data[0];
    const velocity = midiMessage.data[2];

    if (velocity > 0 && commandType >= 144 && commandType <= 159) {
      $lastPlayedNote = midiMessage.data[1];
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

<slot />

<style>
  :global(body) {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    max-width: 680px;
    margin: 0 auto;
    background: #fff;
    color: #333;
  }
</style>
