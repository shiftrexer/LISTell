// Red theme avatar #5 uses a real WebP asset. Keep the cache key in one place.
export const RED5_AVATAR_SRC='/avatar-red-5.webp?v=20261024-3';

export function applyRed5(img){
  if(!img)return false;
  img.src=RED5_AVATAR_SRC;
  img.dataset.source=img.src;
  return true;
}
