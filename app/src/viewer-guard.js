const viewerItems=new Set();
let selectedRole=null;
const nativeFetch=window.fetch.bind(window);
window.fetch=async(...args)=>{
  const response=await nativeFetch(...args);
  try{
    const url=String(args[0]);
    const data=await response.clone().json();
    if(/\/api\/items\/all(?:\?|$)/.test(url)&&Array.isArray(data.items)){
      viewerItems.clear();
      data.items.forEach(item=>{if(item.role==='viewer')viewerItems.add(item.id)});
    }
    const match=url.match(/\/api\/lists\/([^/]+)\/items(?:\?|$)/);
    if(match&&Array.isArray(data.items)){
      selectedRole=data.role||null;
      data.items.forEach(item=>{
        if(selectedRole==='viewer')viewerItems.add(item.id);else viewerItems.delete(item.id);
      });
    }
    queueMicrotask(apply);
  }catch{}
  return response;
};
function apply(){
  document.querySelectorAll('.row').forEach(row=>{
    const buy=row.querySelector('[data-buy]'),edit=row.querySelector('[data-edit]');
    const id=buy?.dataset.buy||edit?.dataset.edit;
    if(!id||!viewerItems.has(id))return;
    buy?.remove();
    edit?.removeAttribute('data-edit');
  });
  const add=document.querySelector('[data-tab="add"]');
  if(add){add.disabled=selectedRole==='viewer';add.setAttribute('aria-disabled',String(selectedRole==='viewer'))}
}
const observer=new MutationObserver(apply);
function install(){
  apply();
  observer.observe(document.querySelector('#app')||document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
export {apply as applyViewerGuard};
