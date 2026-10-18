function haptic(){try{navigator.vibrate?.(10)}catch{}}
export function bindListManagement({api,getState,load}){
  const card=document.querySelector('#listManagementCard');
  if(!card)return;
  const state=getState();
  const reorder=document.querySelector('#reorderLists');
  if(reorder)reorder.onclick=()=>{
    const existing=document.querySelector('#reorderPanel');
    if(existing)return existing.remove();
    const panel=document.createElement('div');panel.id='reorderPanel';panel.className='reorder-panel';
    const ids=[...state.lists];
    const draw=()=>{panel.innerHTML=ids.map((x,i)=>`<div class="reorder-row"><strong>${x.name}</strong><span><button data-up="${i}" ${i===0?'disabled':''}>↑</button><button data-down="${i}" ${i===ids.length-1?'disabled':''}>↓</button></span></div>`).join('')+`<button class="primary" id="saveListOrder">並び順を保存</button>`;panel.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{let i=Number(b.dataset.up);[ids[i-1],ids[i]]=[ids[i],ids[i-1]];haptic();draw()});panel.querySelectorAll('[data-down]').forEach(b=>b.onclick=()=>{let i=Number(b.dataset.down);[ids[i+1],ids[i]]=[ids[i],ids[i+1]];haptic();draw()});panel.querySelector('#saveListOrder').onclick=async()=>{try{await api('lists/reorder',{ids:ids.map(x=>x.id)});haptic();await load()}catch(e){alert(e.message)}}};
    card.after(panel);draw();
  };
}
