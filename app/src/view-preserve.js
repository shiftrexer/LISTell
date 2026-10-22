// Item edits already update the visible row optimistically.
// Do not force a data refresh that changes the active tab after saving.
queueMicrotask(()=>{
  window.__listellRefresh=async()=>{};
});
