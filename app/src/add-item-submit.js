let bypass=false;

function enhance(){
  const sheet=document.querySelector('#shade .sheet');
  if(!sheet||sheet.dataset.addSubmitReady==='1')return;
  const eyebrow=sheet.querySelector('em');
  if(eyebrow?.textContent.trim()!=='NEW ITEM')return;
  const choices=[...sheet.querySelectorAll('[data-choice]')];
  if(!choices.length)return;
  sheet.dataset.addSubmitReady='1';
  let selected=choices.find(b=>b.dataset.choice==='normal')||choices[0];
  choices.forEach(b=>b.classList.toggle('sel',b===selected));
  const submit=document.createElement('button');
  submit.type='button';
  submit.className='primary add-item-submit';
  submit.textContent='リストに追加';
  submit.style.background='var(--accent)';
  submit.style.color='var(--accent-ink)';
  sheet.appendChild(submit);
  submit.addEventListener('click',()=>{
    const input=sheet.querySelector('#name');
    if(!input?.value.trim()){input?.focus();return}
    bypass=true;
    selected.click();
    queueMicrotask(()=>{bypass=false});
  });
  choices.forEach(b=>b.addEventListener('click',e=>{
    if(bypass)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    selected=b;
    choices.forEach(x=>x.classList.toggle('sel',x===b));
  },true));
}

new MutationObserver(enhance).observe(document.body,{childList:true,subtree:true});
enhance();
