const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  document.querySelectorAll('.nav-dropdown').forEach(d=>d.open=false); nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open navigation');
}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');document.querySelectorAll('.nav-dropdown').forEach(d=>d.open=false);}});
document.querySelector('#year').textContent=new Date().getFullYear();

// Desktop pointer menus; native details keeps touch and keyboard interaction.
(()=>{
 const menus=[...document.querySelectorAll('#navigation .nav-dropdown')];
 const desktop=matchMedia('(min-width:1181px) and (hover:hover) and (pointer:fine)');
 const timers=new Map();
 const cancel=item=>{clearTimeout(timers.get(item));timers.delete(item);};
 menus.forEach(item=>{
  item.addEventListener('pointerenter',event=>{
   if(!desktop.matches||event.pointerType==='touch')return;
   menus.forEach(other=>{cancel(other);if(other!==item)other.open=false;});
   item.open=true;
  });
  item.addEventListener('pointerleave',()=>{
   if(!desktop.matches)return;cancel(item);
   timers.set(item,setTimeout(()=>{
    const focused=item.contains(document.activeElement)&&document.activeElement.matches(':focus-visible');
    if(!focused)item.open=false;
   },220));
  });
  item.addEventListener('focusin',()=>cancel(item));
  item.addEventListener('focusout',()=>{if(desktop.matches)timers.set(item,setTimeout(()=>{if(!item.contains(document.activeElement)&&!item.matches(':hover'))item.open=false;},0));});
 });
 desktop.addEventListener('change',()=>menus.forEach(item=>{cancel(item);item.open=false;}));
})();
