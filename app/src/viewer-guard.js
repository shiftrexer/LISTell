const viewerItems=new Set();
let selectedRole=null;
let selectedPriority='normal';
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
function setupPriorityPicker(){
  const sheet=document.querySelector('.sheet');
  if(!sheet||sheet.dataset.priorityPicker==='ready')return;
  const choices=[...sheet.querySelectorAll('[data-choice]')];
  if(!choices.length)return;
  sheet.dataset.priorityPicker='ready';
  let selected='normal';
  const colors={urgent:'#ff5f57',normal:'#65d46e',any:'#ffffff'};
  const paint=()=>choices.forEach(b=>{
    const on=b.dataset.choice===selected,c=colors[b.dataset.choice]||'#fff';
    b.style.color=c;b.style.borderColor=on?c:'#3a403a';b.style.background=on?`${c}22`:'#101310';
    b.style.boxShadow=on?`0 0 0 1px ${c} inset`:'none';
    b.setAttribute('aria-pressed',String(on));
  });
  paint();
  choices.forEach(b=>b.addEventListener('click',e=>{
    if(b.dataset.commit==='1'){delete b.dataset.commit;return}
    e.preventDefault();e.stopImmediatePropagation();selected=b.dataset.choice;paint();
  },true));
  const add=document.createElement('button');
  add.type='button';add.className='priority-add';add.textContent='リストに追加';
  Object.assign(add.style,{width:'100%',height:'56px',border:'0',borderRadius:'16px',background:'#b9f486',color:'#071006',fontWeight:'800',fontSize:'18px',marginTop:'4px'});
  add.onclick=()=>{
    const target=choices.find(b=>b.dataset.choice===selected);
    if(!target)return;
    target.dataset.commit='1';target.click();
  };
  choices[0].parentElement.insertAdjacentElement('afterend',add);
}
function paintPriorityView(){
  const colors={urgent:'#ff5f57',normal:'#65d46e',any:'#ffffff'};
  document.querySelectorAll('[data-p]').forEach(b=>{
    const on=b.dataset.p===selectedPriority,c=colors[b.dataset.p]||'#fff';
    b.style.color=c;b.style.borderColor=on?c:'#3a403a';b.style.background=on?`${c}22`:'#101310';
    b.style.boxShadow=on?`0 0 0 1px ${c} inset`:'none';
    b.setAttribute('aria-pressed',String(on));
  });
}
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
  setupPriorityPicker();
  paintPriorityView();
}
const observer=new MutationObserver(apply);
function install(){
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-p]');
    if(!b)return;
    selectedPriority=b.dataset.p;
    queueMicrotask(apply);
  },true);
  apply();
  observer.observe(document.querySelector('#app')||document.body,{childList:true,subtree:true});
  observer.observe(document.body,{childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
export {apply as applyViewerGuard};
