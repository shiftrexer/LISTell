export function applyViewerGuard(getState){
  const state=getState();
  const roleFor=item=>item?.role||state.list?.role;
  document.querySelectorAll('[data-buy]').forEach(button=>{
    const item=[...state.items,...state.allItems].find(x=>x.id===button.dataset.buy);
    if(roleFor(item)==='viewer')button.remove();
  });
  document.querySelectorAll('[data-edit]').forEach(target=>{
    const item=[...state.items,...state.allItems].find(x=>x.id===target.dataset.edit);
    if(roleFor(item)==='viewer')target.removeAttribute('data-edit');
  });
  const add=document.querySelector('[data-tab="add"]');
  if(add&&state.list?.role==='viewer')add.disabled=true;
  if(state.panel==='manage'&&state.list?.role!=='admin'){
    document.querySelector('#renameList')?.remove();
    document.querySelector('#deleteList')?.remove();
  }
}
