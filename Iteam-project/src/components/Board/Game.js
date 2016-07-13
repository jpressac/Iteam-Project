let NotePosition = [0,0];
let observer = null;

function emitChange() {
  observer(NotePosition);
}

export function observe(o) {
  observer = o;
  emitChange();

  return () => {
    observer = null;
  };
}

export function moveNote(toX, toY) {
  NotePosition = [toX, toY];
  emitChange();
}
