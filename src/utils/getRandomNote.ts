import type { Note } from "./musicalNotes";

export function getRandomNote(notes: Note[], previousNote?: Note): Note {
  const nextNote = notes[Math.floor(Math.random() * notes.length)];

  if (!previousNote) return nextNote;

  return nextNote.midiValue === previousNote.midiValue
    ? getRandomNote(notes, previousNote)
    : nextNote;
}
