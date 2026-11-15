// Keep service categories expanded on desktop and individually expandable on mobile.
(()=>{
 const nav=document.querySelector('#navigation');
 if(nav&&!nav.querySelector('a[href="/sg/cloud-connectivity-singapore/"]')){
  const mssc=nav.querySelector('a[href="/sg/multiple-services-connectivity-singapore/"]');
  if(mssc){const link=document.createElement('a');link.href='/sg/cloud-connectivity-singapore/';link.innerHTML='Cloud Connectivity<small>AWS, Azure &amp; Google Cloud</small>';mssc.before(link);link.addEventListener('click',()=>{nav.querySelectorAll('.nav-dropdown').forEach(d=>d.open=false);nav.classList.remove('open');const toggle=document.querySelector('.menu-toggle');if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}});}
 }
 const query=matchMedia('(min-width:1181px)');
 const groups=[...document.querySelectorAll('.service-menu-group')];
 const sync=()=>groups.forEach(group=>group.open=query.matches);
 groups.forEach(group=>group.querySelector('summary').addEventListener('click',event=>{if(query.matches)event.preventDefault();}));
 query.addEventListener('change',sync);sync();
})();
