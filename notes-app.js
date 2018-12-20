let notes = getSavedNotes();

const filters = {
  searchText: "",
  sortBy: "byEdited"
};

// Create and Update localStorage
// localStorage.setItem("location", "Boston");
// Read localStorage
// console.log(localStorage.getItem("location"));
// Delete localStorage with .removeItem or .clear
// localStorage.removeItem("location");

renderNotes(notes, filters);

document.querySelector("#create-note").addEventListener("click", e => {
  const id = uuidv4();
  const timestamp = moment().valueOf();

  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp
  });

  saveNotes(notes);
  // renderNotes(notes, filters);
  location.assign(`/edit.html#${id}`);
});

// document.querySelector("#remove-all").addEventListener("click", function() {
//   document.querySelectorAll(".note").forEach(function(note) {
//     note.remove();
//   });
//   console.log("Deleted all notes");
// });

document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector("#filter-by").addEventListener("change", e => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener("storage", e => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});
