const json=(v,s=200)=>new Response(JSON.stringify(v),{status:s,headers:{'content-type':'application/json;charset=UTF-8'}});
export async function listIconsApi(req,env,u,url,body){
  const db=env.DB,p=url.pathname.split('/').filter(Boolean);
  if(url.pathname==='/api/list-icons'&&req.method==='GET'){
    const r=await db.prepare('SELECT l.id,l.icon FROM lists l JOIN list_members m ON m.list_id=l.id WHERE m.user_id=?').bind(u.id).all();
    return json({icons:r.results});
  }
  if(p[1]==='lists'&&p[2]&&p[3]==='icon'&&req.method==='POST'){
    const m=await db.prepare('SELECT role FROM list_members WHERE list_id=? AND user_id=?').bind(p[2],u.id).first();
    if(!m||m.role!=='admin')return json({error:'管理者のみ変更できます'},403);
    const icon=Number(body.icon);
    if(!Number.isInteger(icon)||icon<1||icon>9)return json({error:'アイコンが不正です'},400);
    await db.prepare('UPDATE lists SET icon=? WHERE id=?').bind(icon,p[2]).run();
    return json({ok:true,icon});
  }
  return null;
}
