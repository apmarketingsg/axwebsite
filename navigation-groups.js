// Keep service categories expanded on desktop and individually expandable on mobile.
(()=>{
 const query=matchMedia('(min-width:1181px)');
 const groups=[...document.querySelectorAll('.service-menu-group')];
 const sync=()=>groups.forEach(group=>group.open=query.matches);
 groups.forEach(group=>group.querySelector('summary').addEventListener('click',event=>{if(query.matches)event.preventDefault();}));
 query.addEventListener('change',sync);sync();
})();
