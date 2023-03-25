export type Note = {
  easyScoreValue: string;
  midiValue: number;
  clef: "treble" | "bass";
};

export const basicRightHandNotes: Note[] = [
  { easyScoreValue: "b/3", midiValue: 59, clef: "treble" },
  { easyScoreValue: "c/4", midiValue: 60, clef: "treble" },
  { easyScoreValue: "d/4", midiValue: 62, clef: "treble" },
  { easyScoreValue: "e/4", midiValue: 64, clef: "treble" },
  { easyScoreValue: "f/4", midiValue: 65, clef: "treble" },
  { easyScoreValue: "g/4", midiValue: 67, clef: "treble" },
  { easyScoreValue: "a/4", midiValue: 69, clef: "treble" },
];

export const basicLeftHandNotes: Note[] = [
  { easyScoreValue: "b/2", midiValue: 47, clef: "bass" },
  { easyScoreValue: "c/3", midiValue: 48, clef: "bass" },
  { easyScoreValue: "d/3", midiValue: 50, clef: "bass" },
  { easyScoreValue: "e/3", midiValue: 52, clef: "bass" },
  { easyScoreValue: "f/3", midiValue: 53, clef: "bass" },
  { easyScoreValue: "g/3", midiValue: 55, clef: "bass" },
  { easyScoreValue: "a/3", midiValue: 57, clef: "bass" },
];

export const basicNotes: Note[] = [
  ...basicRightHandNotes,
  ...basicLeftHandNotes,
];
