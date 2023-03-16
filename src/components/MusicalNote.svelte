<script lang="ts">
  import { onMount } from "svelte";
  import { Formatter, Renderer, Stave, StaveNote, Voice } from "vexflow";
  import type { Note } from "../utils/musicalNotes";

  export let note: Note;
  let output: HTMLDivElement;

  const drawStave = (noteToDraw: Note) => {
    if (!output) return;

    const renderer = new Renderer(output, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(205, 200);
    const context = renderer.getContext();
    context.scale(2, 2);

    const stave = new Stave(0, 0, 100);

    // Add a clef and time signature.
    stave.addClef(noteToDraw.clef);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // Create the notes
    const notes = [
      // A quarter-note C.
      new StaveNote({
        keys: [noteToDraw.easyScoreValue],
        duration: "q",
        clef: noteToDraw.clef,
      }),
    ];

    // Create a voice in 4/4 and add above notes
    const voice = new Voice();
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    // new Formatter().joinVoices([voice]).format([voice], 350);

    Formatter.FormatAndDraw(context, stave, notes);

    // Render voice
    // voice.draw(context, stave);
  };

  onMount(() => {
    drawStave(note);
  });
</script>

<div bind:this={output} />

<style>
  div {
    display: grid;
    place-items: center;
  }
</style>
