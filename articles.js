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

/* Original production imagery restored across resource templates. */
(()=>{const images={"/sg/resources/blog/400g-dwdm/":"/technical-400g-grid.svg","/sg/resources/blog/local-internet-breakout/":"/media-79c1c54d82a3.jpg","/sg/resources/blog/dark-fiber-vs-lit-fiber/":"/media-9389f7d6a2a0.jpg","/sg/resources/blog/sd-wan-vs-mpls/":"/media-48d96913e09e.jpg","/sg/resources/insights/internet-service-provider-singapore/":"/article-banner.webp","/sg/resources/insights/singapore-sao-paulo-latency/":"/media-6f876048a874.png","/sg/resources/insights/singapore-to-china-high-latency/":"/media-3fdc3903a4d1.png","/sg/resources/blog/beyond-singapores-borders-how-axclusives-international-network-delivers-true-end-to-end-connectivity/":"/article-banner.webp","/sg/resources/blog/what-is-sip-trunking/":"/article-banner.webp","/sg/resources/blog/break-the-speed-barrier-next-gen-high-speed-building-to-building-connectivity-in-singapore/":"/article-banner.webp","/sg/resources/blog/what-is-last-mile-connectivity/":"/media-84667288932d.png","/sg/resources/blog/how-internet-works/":"/media-2601f22e0f65.jpg","/sg/resources/blog/demystifying-internet-in-singapore-5-myths-every-business-should-know/":"/article-banner.webp","/sg/resources/blog/cloudflare-axclusive/":"/technical-ddos-layers.svg","/sg/resources/blog/cisco-duo-axclusive/":"/article-banner.webp","/sg/resources/blog/are-you-in-equinix-sg-1-and-global-switch-singapore-heres-the-best-way-to-interconnect-your-network/":"/article-banner.webp","/sg/resources/blog/why-is-your-international-internet-connectivity-slow/":"/media-2601f22e0f65.jpg","/sg/resources/blog/tcp-vs-udp/":"/technical-transport-protocols.svg","/sg/resources/blog/voip-vs-landline/":"/article-banner.webp","/sg/resources/blog/pri-and-sip-trunking/":"/article-banner.webp","/sg/resources/blog/what-is-broadband-internet/":"/media-f343b9c5b576.jpeg","/sg/resources/blog/what-is-cold-potato-routing/":"/media-6683c92aac0f.png","/sg/resources/blog/what-is-satellite-internet/":"/media-7261324a0a3c.png","/sg/resources/blog/pbx-vs-voip/":"/article-banner.webp","/sg/resources/blog/cisco-equipment-axclusive/":"/article-banner.webp","/sg/resources/blog/cloudflare-magic-transit/":"/technical-ddos-layers.svg","/sg/resources/blog/voip-call-quality/":"/media-92851a377e19.png","/sg/resources/blog/what-is-tcp/":"/media-cd7e8c7eed5f.png","/sg/resources/blog/what-is-bandwidth-throttling/":"/media-58ecb9920ce1.png","/sg/resources/blog/what-is-network-jitter/":"/media-c6a0c3f6268e.png","/sg/resources/blog/what-is-packet-in-networking/":"/media-6f140c47685b.png","/sg/resources/blog/what-is-internet-protocol/":"/media-bbe884f2c57d.png","/sg/resources/blog/what-is-an-extranet/":"/media-14c8457ae1b1.png","/sg/resources/blog/what-is-cable-internet/":"/media-4ee74b43a63e.png","/sg/resources/blog/what-is-load-balancing/":"https://alsg.s3.ap-southeast-1.amazonaws.com/ax/2026/02/What_is_Load_Balancing_753817eec1.png","/sg/resources/blog/sip-trunking-vs-voip/":"/article-banner.webp","/sg/resources/blog/internet-backbone/":"/media-93ed229ba2c3.png","/sg/resources/blog/what-is-network-layer/":"/media-c397dedee60b.png","/sg/resources/blog/how-does-a-router-work/":"/media-fa5787c3f2b1.png","/sg/resources/blog/network-attack/":"/media-b97b29320058.jpg","/sg/resources/blog/what-is-overlay-network/":"/media-1f858d2b1c35.png","/sg/resources/blog/hub-and-spoke-network/":"/media-cfdef37aace2.png","/sg/resources/blog/cwdm-vs-dwdm/":"/technical-cwdm-dwdm.svg","/sg/resources/blog/voip-vs-ucaas/":"/article-banner.webp","/sg/resources/blog/what-is-an-ethernet-switch/":"/media-d5f872702cc6.png","/sg/resources/blog/what-is-a-ddos-attack/":"/media-2e55ee7288ed.png","/sg/resources/blog/dos-vs-ddos-attacks/":"/media-0bee728dc7f7.jpg","/sg/resources/blog/http-flood-ddos-attack/":"/media-1000f973f0b2.jpeg","/sg/resources/blog/user-datagram-protocol/":"/media-f4b9dddad544.jpg","/sg/resources/blog/what-is-ddos-protection/":"/article-banner.webp","/sg/resources/blog/how-to-prevent-ddos-attack/":"/article-banner.webp","/sg/resources/blog/cloudflare-magic-transit-ddos-protection/":"/technical-ddos-layers.svg","/sg/resources/blog/cloudflare-and-fastnetmon-ddos-protection/":"/technical-ddos-layers.svg","/sg/resources/blog/what-is-blackhole-routing/":"/media-037c1de1dd1d.jpeg","/sg/resources/blog/what-is-redundant-routing/":"/media-7716ec43f384.png","/sg/resources/blog/what-is-packet-loss/":"/media-dc0ee2cf9145.png","/sg/resources/blog/internet-exchange-point/":"/media-7996cd71cf28.jpg","/sg/resources/blog/how-cdn-providers-are-changing-internet-behavior/":"/media-2601f22e0f65.jpg","/sg/resources/blog/how-axclusive-helps-korean-companies-improve-global-connectivity/":"/article-banner.webp","/sg/resources/blog/what-is-wdm/":"/media-2aa2bbaac6ec.png","/sg/resources/blog/coherent-dwdm/":"/media-d054b28edcbf.jpg","/sg/resources/blog/what-is-vxlan/":"/technical-vxlan-segments.svg","/sg/resources/blog/ai-infrastructure-for-model-training/":"/article-banner.webp","/sg/resources/blog/ai-training-vs-ai-inferencing-network-infrastructure/":"/article-banner.webp","/sg/resources/blog/what-is-hosted-voip/":"/media-3e53d8506f40.png","/sg/resources/blog/voip-bandwidth/":"/article-banner.webp","/sg/resources/blog/what-is-low-latency/":"/media-c08cc4fb4775.png","/sg/resources/blog/what-is-dwdm/":"/media-3fd06686a751.png","/sg/resources/blog/what-is-peering/":"/media-5e379a18ec43.png","/sg/resources/blog/what-is-bgp/":"/technical-bgp-policy.svg","/sg/resources/blog/what-is-mpls/":"/technical-mpls.svg","/sg/resources/blog/what-is-session-border-controller/":"/article-banner.webp","/sg/resources/blog/ddos-mitigation/":"/article-banner.webp","/sg/resources/blog/rtt-in-networking/":"/media-efaf73a2a7d9.png","/sg/resources/blog/choosing-the-best-outgoing-path-for-your-internet-connection/":"/media-2601f22e0f65.jpg"};const banner="/article-banner.webp";const heading=document.querySelector('.article-heading');if(heading&&!document.querySelector('.article-banner')){const figure=document.createElement('figure');figure.className='article-banner';const img=document.createElement('img');img.src=banner;img.width=1240;img.height=312;img.decoding='async';img.alt='';img.loading='eager';img.fetchPriority='high';figure.append(img);heading.before(figure);}document.querySelectorAll('.article-related a').forEach(a=>{const src=images[new URL(a.href).pathname];if(!src||a.querySelector('img'))return;const img=document.createElement('img');img.src=src;img.alt='';img.className='related-thumbnail';img.loading='lazy';img.width=640;img.height=360;a.prepend(img);});})();

// Keep comparison labels next to their values on small screens.
// Only enhance rectangular tables: merged/complex tables retain native scrolling.
(()=>{
 document.querySelectorAll('.article-content table').forEach((table,index)=>{
  const rows=[...table.rows];if(rows.length<2)return;
  const header=rows[0], labels=[...header.cells].map(c=>c.textContent.trim());
  const recognised=header.querySelector('th,[role=columnheader]')||[...header.cells].every(c=>c.querySelector('strong,b'));
  if(!recognised||labels.length<2||labels.some(l=>!l)||rows.some(r=>r.cells.length!==labels.length||[...r.cells].some(c=>c.colSpan!==1||c.rowSpan!==1)))return;
  table.classList.add('mobile-comparison');table.setAttribute('role','table');header.classList.add('comparison-label-row');header.setAttribute('role','row');
  [...header.cells].forEach((c,i)=>{c.id=c.id||`comparison-${index}-heading-${i}`;c.setAttribute('role','columnheader');});
  rows.slice(1).forEach(row=>{row.setAttribute('role','row');[...row.cells].forEach((cell,i)=>{
   cell.setAttribute('role','cell');cell.setAttribute('headers',header.cells[i].id);
   const label=document.createElement('span');label.className='comparison-cell-label';label.textContent=labels[i];label.setAttribute('aria-hidden','true');
   const value=document.createElement('div');value.className='comparison-cell-value';while(cell.firstChild)value.append(cell.firstChild);cell.append(label,value);
  });});
 });
})();
