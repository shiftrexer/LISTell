const COLORS={basic:'#B9F486',red:'#E63946',blue:'#1D3557',yellow:'#FFD166',orange:'#F4A261',purple:'#6A0572',cyan:'#4EA8DE'};
const NAMES={basic:'ベーシック',red:'赤',blue:'青',yellow:'黄',orange:'オレンジ',purple:'紫',cyan:'水色',random:'ランダム'};
const KEYS=['basic','red','blue','yellow','orange','purple','cyan'];
const randomKey=KEYS[Math.floor(Math.random()*KEYS.length)];
function current(){return{dark:localStorage.getItem('listell_dark_mode')!=='0',accent:localStorage.getItem('listell_accent')||'basic'}}
function resolvedAccent(key){return COLORS[key==='random'?randomKey:key]||COLORS.basic}
export function applyDesign(){let s=current(),root=document.documentElement;root.dataset.theme=s.dark?'dark':'light';root.style.setProperty('--accent',resolvedAccent(s.accent));root.style.setProperty('--accent-ink',s.accent==='yellow'||s.accent==='orange'||s.accent==='basic'||s.accent==='cyan'?'#071006':'#ffffff');}
export function designView(){let s=current();return `<header><em>DESIGN</em><h1>デザイン設定</h1></header><label>ベースカラー</label><section class="card settings design-base"><div><strong>ダークモード</strong><input id="darkModeToggle" class="toggle" type="checkbox" ${s.dark?'checked':''}></div></section><label>サブカラー</label><div class="color-grid">${[...KEYS,'random'].map(k=>`<label class="color-option"><input type="radio" name="accent" value="${k}" ${s.accent===k?'checked':''}><span class="color-dot" style="--swatch:${k==='random'?'conic-gradient(#B9F486 0 14%,#E63946 14% 28%,#1D3557 28% 42%,#FFD166 42% 56%,#F4A261 56% 70%,#6A0572 70% 84%,#4EA8DE 84%)':COLORS[k]}"></span><small>${NAMES[k]}</small></label>`).join('')}</div>`}
export function bindDesign(){let t=document.querySelector('#darkModeToggle');if(t)t.onchange=()=>{localStorage.setItem('listell_dark_mode',t.checked?'1':'0');applyDesign()};document.querySelectorAll('input[name="accent"]').forEach(r=>r.onchange=()=>{if(!r.checked)return;localStorage.setItem('listell_accent',r.value);applyDesign()})}
applyDesign();
