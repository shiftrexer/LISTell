const prefix='listell_list_icon_';
const nativeSet=Storage.prototype.setItem;
let syncing=false;
function token(){return localStorage.getItem('listell_token')}
async function pushIcon(id,icon){const t=token();if(!t)return;try{const r=await fetch(`/api/lists/${id}/icon`,{method:'POST',headers:{'content-type':'application/json',authorization:`Bearer ${t}`},body:JSON.stringify({icon:Number(icon)})});if(!r.ok)await syncIcons(true)}catch{}}
Storage.prototype.setItem=function(k,v){nativeSet.call(this,k,v);if(this===localStorage&&!syncing&&String(k).startsWith(prefix)){const id=String(k).slice(prefix.length);pushIcon(id,v)}};
export async function syncIcons(reload=false){const t=token();if(!t)return false;try{const r=await fetch('/api/list-icons',{headers:{authorization:`Bearer ${t}`}});if(!r.ok)return false;const j=await r.json();let changed=false;syncing=true;for(const x of j.icons||[]){const k=prefix+x.id,v=String(x.icon||1);if(localStorage.getItem(k)!==v){nativeSet.call(localStorage,k,v);changed=true}}syncing=false;if(changed&&reload)location.reload();return changed}catch{syncing=false;return false}}
const changed=await syncIcons(false);if(changed&&sessionStorage.getItem('listell_icon_sync_reload')!=='1'){sessionStorage.setItem('listell_icon_sync_reload','1');location.reload()}else sessionStorage.removeItem('listell_icon_sync_reload');
document.addEventListener('visibilitychange',()=>{if(!document.hidden)syncIcons(true)});
window.addEventListener('focus',()=>syncIcons(true));
