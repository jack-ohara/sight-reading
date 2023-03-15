<script lang="ts">
  import { onMount } from "svelte";
  import { Formatter, Renderer, Stave, StaveNote, Voice } from "vexflow";
  import type { Note } from "../utils/getRandomNote";

  export let note: Note;
  let output: HTMLDivElement;

  const drawStave = (noteToDraw: Note) => {
    if (!output) return;

    const renderer = new Renderer(output, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(111, 100);
    const context = renderer.getContext();

    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new Stave(10, 0, 100);

    // Add a clef and time signature.
    stave.addClef(noteToDraw.stave);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // Create the notes
    const notes = [
      // A quarter-note C.
      new StaveNote({ keys: [noteToDraw.easyScoreValue], duration: "q" }),
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
