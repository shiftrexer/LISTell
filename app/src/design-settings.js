const COLORS={green:'#B9F486',red:'#E63946',blue:'#0D43FF',yellow:'#FFD166',orange:'#FF852F',purple:'#E085FF'};
const NAMES={green:'green',red:'red',blue:'blue',yellow:'yellow',orange:'orange',purple:'purple',random:'random'};
const KEYS=['green','red','blue','yellow','orange','purple'];
const randomKey=KEYS[Math.floor(Math.random()*KEYS.length)];
function current(){let accent=localStorage.getItem('listell_accent')||'green';if(accent==='basic'||accent==='cyan')accent='green';return{dark:localStorage.getItem('listell_dark_mode')!=='0',accent}}
function resolvedAccent(key){return COLORS[key==='random'?randomKey:key]||COLORS.green}
function applyDesign(){let s=current(),root=document.documentElement;root.dataset.theme=s.dark?'dark':'light';root.style.setProperty('--accent',resolvedAccent(s.accent));root.style.setProperty('--accent-ink',s.accent==='yellow'||s.accent==='orange'||s.accent==='green'||s.accent==='purple'?'#071006':'#ffffff')}
function designControls(){let s=current();return `<label>ベースカラー</label><section class="card settings design-base"><div><strong>ダークモード</strong><input id="darkModeToggle" class="toggle" type="checkbox" ${s.dark?'checked':''}></div></section><label>サブカラー</label><div class="color-grid">${[...KEYS,'random'].map(k=>`<label class="color-option"><input type="radio" name="accent" value="${k}" ${s.accent===k?'checked':''}><span class="color-dot" style="--swatch:${k==='random'?'conic-gradient(#B9F486 0 16.66%,#E63946 16.66% 33.33%,#0D43FF 33.33% 50%,#FFD166 50% 66.66%,#FF852F 66.66% 83.33%,#E085FF 83.33%)':COLORS[k]}"></span><small>${NAMES[k]}</small></label>`).join('')}</div>`}
function bindDesign(){let t=document.querySelector('#darkModeToggle');if(t)t.onchange=()=>{localStorage.setItem('listell_dark_mode',t.checked?'1':'0');applyDesign()};document.querySelectorAll('input[name="accent"]').forEach(r=>r.onchange=()=>{if(!r.checked)return;localStorage.setItem('listell_accent',r.value);applyDesign()})}
function hydrate(){let main=document.querySelector('#app main'),title=main?.querySelector('h1');if(!main||title?.textContent!=='デザイン設定'||main.querySelector('.design-base'))return;main.insertAdjacentHTML('beforeend',designControls());bindDesign()}
applyDesign();
new MutationObserver(hydrate).observe(document.getElementById('app'),{childList:true,subtree:true});
hydrate();
