export type Note = {
  easyScoreValue: string;
  midiValue: number;
  stave: "treble" | "bass";
};

const notes: Note[] = [
  { easyScoreValue: "c/4", midiValue: 60, stave: "treble" },
  { easyScoreValue: "d/4", midiValue: 62, stave: "treble" },
  { easyScoreValue: "e/4", midiValue: 64, stave: "treble" },
  { easyScoreValue: "f/4", midiValue: 65, stave: "treble" },
  { easyScoreValue: "g/4", midiValue: 67, stave: "treble" },
];

export function getRandomNote(previousNote?: Note): Note {
  const nextNote = notes[Math.floor(Math.random() * notes.length)];

  if (!previousNote) return nextNote;

  return nextNote.midiValue === previousNote.midiValue
    ? getRandomNote(previousNote)
    : nextNote;
}
