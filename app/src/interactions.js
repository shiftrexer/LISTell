const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function haptic(){try{navigator.vibrate?.(12)}catch{}}
function install(){
  document.addEventListener('click',async event=>{
    const button=event.target.closest?.('[data-buy]');
    if(!button||button.dataset.feedback==='running')return;
    button.dataset.feedback='running';
    const row=button.closest('.row');
    haptic();
    if(row){row.classList.add('purchasing');await wait(200)}
  },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
