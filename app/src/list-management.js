function haptic(){try{navigator.vibrate?.(10)}catch{}}
export function bindListManagement({api}){
  const rename=document.querySelector('#renameList');
  if(!rename)return;
  const card=rename.closest('.card');
  if(!card||card.dataset.managementReady)return;
  card.dataset.managementReady='true';
  const create=document.createElement('div');create.id='manageNewList';create.innerHTML='<strong>新規リストを作成</strong><b>›</b>';
  const reorder=document.createElement('div');reorder.id='reorderLists';reorder.innerHTML='<strong>リストを並び替え</strong><b>›</b>';
  card.prepend(reorder);card.prepend(create);
  create.onclick=async()=>{let name=await window.listellPrompt({title:'新規リストを作成',label:'リスト名',placeholder:'リスト名を入力'});if(!name)return;try{await api('lists',{name});haptic();location.reload()}catch(e){alert(e.message)}};
  reorder.onclick=async()=>{
    const existing=document.querySelector('#reorderPanel');if(existing)return existing.remove();
    try{
      const result=await api('lists'),ids=[...result.lists];
      const panel=document.createElement('section');panel.id='reorderPanel';panel.className='card reorder-panel';
      const draw=()=>{panel.innerHTML=ids.map((x,i)=>`<div class="reorder-row"><strong>${x.name}</strong><span><button data-up="${i}" ${i===0?'disabled':''}>↑</button><button data-down="${i}" ${i===ids.length-1?'disabled':''}>↓</button></span></div>`).join('')+'<button class="primary" id="saveListOrder">並び順を保存</button>';panel.querySelectorAll('[data-up]').forEach(b=>b.onclick=()=>{let i=Number(b.dataset.up);[ids[i-1],ids[i]]=[ids[i],ids[i-1]];haptic();draw()});panel.querySelectorAll('[data-down]').forEach(b=>b.onclick=()=>{let i=Number(b.dataset.down);[ids[i+1],ids[i]]=[ids[i],ids[i+1]];haptic();draw()});panel.querySelector('#saveListOrder').onclick=async()=>{try{await api('lists/reorder',{ids:ids.map(x=>x.id)});haptic();location.reload()}catch(e){alert(e.message)}}};
      card.after(panel);draw();
    }catch(e){alert(e.message)}
  };
}
