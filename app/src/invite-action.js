import {showInviteSheet} from './invite.js';

export function bindInviteAction({api,getListId}){
  const button=document.querySelector('#invite');
  if(!button)return;
  button.onclick=async()=>{
    try{
      const listId=getListId();
      if(!listId)throw Error('先にリストを選択してください');
      const result=await api(`lists/${listId}/invite`,{});
      const link=`${location.origin}/?invite=${encodeURIComponent(result.token)}`;
      const expiresAt=Number(result.expiresAt||result.expires_at)||Date.now()+300000;
      await showInviteSheet(link,expiresAt);
    }catch(error){
      alert(error.message||'招待を作成できませんでした');
    }
  };
}
