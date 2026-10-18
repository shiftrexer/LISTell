const roleFromRow=row=>row?.dataset?.role;
function apply(){
  document.querySelectorAll('.row').forEach(row=>{
    if(roleFromRow(row)!=='viewer')return;
    row.querySelector('[data-buy]')?.remove();
    row.querySelector('[data-edit]')?.removeAttribute('data-edit');
  });
  document.querySelectorAll('[data-viewer-readonly="true"]').forEach(scope=>{
    scope.querySelectorAll('[data-buy]').forEach(x=>x.remove());
    scope.querySelectorAll('[data-edit]').forEach(x=>x.removeAttribute('data-edit'));
  });
}
const observer=new MutationObserver(apply);
function install(){
  apply();
  const root=document.querySelector('#app')||document.body;
  observer.observe(root,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
export {apply as applyViewerGuard};
