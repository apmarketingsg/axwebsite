// Keep service categories expanded on desktop and individually expandable on mobile.
(()=>{
 const nav=document.querySelector('#navigation');
 if(nav&&!nav.querySelector('a[href="/sg/cloud-connectivity-singapore/"]')){
  const mssc=nav.querySelector('a[href="/sg/multiple-services-connectivity-singapore/"]');
  if(mssc){const link=document.createElement('a');link.href='/sg/cloud-connectivity-singapore/';link.innerHTML='Cloud Connectivity<small>Private access to supported clouds</small>';mssc.before(link);link.addEventListener('click',()=>{nav.querySelectorAll('.nav-dropdown').forEach(d=>d.open=false);nav.classList.remove('open');const toggle=document.querySelector('.menu-toggle');if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}});}
 }
 const query=matchMedia('(min-width:1181px)');
 const groups=[...document.querySelectorAll('.service-menu-group')];
 const sync=()=>groups.forEach(group=>group.open=query.matches);
 groups.forEach(group=>group.querySelector('summary').addEventListener('click',event=>{if(query.matches)event.preventDefault();}));
 query.addEventListener('change',sync);sync();
})();

// Consistent footer and cloud discovery across existing pages.
(()=>{
 const grid=document.querySelector("footer .footer-grid");
 if(grid&&!grid.classList.contains("footer-expanded")) grid.outerHTML="<div class=\"container footer-grid footer-expanded\"><div class=\"footer-brand\"><a href=\"/sg/\"><img src=\"/transit-logo-footer.png\" alt=\"Axclusive\" width=\"160\" height=\"90\" loading=\"lazy\"></a><p>Connecting your business<br>to the world.</p><p>8 Ubi Road 2, Zervex<br>#03-27/28, Singapore 408538</p><a href=\"tel:+6560111719\">+65 6011 1719</a><div class=\"footer-certification\"><img src=\"https://cdn.axclusive.com.sg/ax/2026/08/ISO_20000_2018_QFS_fn_1fb803b62a.png\" alt=\"ISO 20000-1:2018 Certified\" width=\"160\" loading=\"lazy\"><p>ISO 20000-1:2018 Certified</p></div></div><div><h3>Connectivity</h3><a href=\"/sg/ip-transit-singapore/\">IP Transit</a><a href=\"/sg/dedicated-internet-access-singapore/\">Dedicated Internet Access</a><a href=\"/sg/cloud-connectivity-singapore/\">Cloud Connectivity</a><a href=\"/sg/multiple-services-connectivity-singapore/\">Multiple Services Single Circuit (MSSC)</a><a href=\"/sg/leased-line-singapore/\">Leased Lines</a><a href=\"/sg/international-private-line-iplc-iepl/\">International Private Lines</a><a href=\"/sg/data-center-interconnect-singapore/\">Data Center Interconnect</a><a href=\"/sg/managed-dark-fibre-dwdm-singapore/\">Managed Optical Fiber Network (MOFN)</a><a href=\"/sg/colocation/\">Server &amp; Network Colocation</a></div><div><h3>Managed Services &amp; Voice</h3><a href=\"/sg/managed-sd-wan-singapore/\">Managed SD-WAN</a><a href=\"/sg/managed-services-singapore/\">Managed Infrastructure &amp; IT</a><a href=\"/sg/ddos-protection/\">DDoS Protection</a><a href=\"/sg/managed-cdn-singapore/\">Managed CDN</a><a href=\"/sg/cisco-duo-singapore/\">MFA &amp; Secure Access</a><a href=\"/sg/it-products-licensing-singapore/\">IT Equipment &amp; Software Supply</a><a href=\"/sg/sip-trunking/\">SIP Trunking</a><a href=\"/sg/managed-cloud-pbx-singapore/\">Managed Yeastar PBX</a><a href=\"/sg/teams-calling/\">Microsoft Teams Calling</a><a href=\"/sg/webex-calling/\">Webex Calling</a></div><div><h3>Company &amp; Resources</h3><a href=\"/sg/about/\">About Us</a><a href=\"/sg/partners/\">Reseller &amp; SI Partners</a><a href=\"/sg/contact-us/\">Contact Us</a><a href=\"/sg/carriers-isps/\">Carriers &amp; ISPs</a><a href=\"/sg/hosting-cloud-providers/\">Hosting &amp; Cloud Providers</a><a href=\"/sg/businesses-enterprises/\">Businesses &amp; Enterprises</a><a href=\"/sg/network-coverage-singapore/\">Singapore Coverage</a><a href=\"/sg/global-sd-wan-coverage/\">Global SD-WAN Coverage</a><a href=\"/sg/resources/blog/\">Blog</a><a href=\"/sg/resources/insights/\">Insights</a></div></div>";
 const cloud=document.querySelector('#navigation a[href="/sg/cloud-connectivity-singapore/"] small');
 if(cloud) cloud.textContent="Private access to supported clouds";
})();

// Keep legal, calculator and application links at their existing public paths.
(()=>{
 const slugs=['privacy-policy','general-terms-of-use','sip-trunk-pricing-estimator','become-a-partner'];
 document.querySelectorAll('a[href]').forEach(a=>{try{const u=new URL(a.href);if(u.hostname==='axclusive.com'&&slugs.some(s=>u.pathname==='/sg/'+s+'/'))a.setAttribute('href',u.pathname+u.search+u.hash);}catch{}});
 const footer=document.querySelector('footer');if(!footer)return;
 const brand=footer.querySelector('.footer-brand');if(brand&&!brand.querySelector('.footer-social')){const social=document.createElement('div');social.className='footer-social';social.innerHTML='<a href="https://www.linkedin.com/company/axclusiveisp">LinkedIn</a><a href="https://www.facebook.com/axclusiveisp">Facebook</a>';brand.append(social);}
 const info=[...footer.querySelectorAll('.footer-grid>div')].find(d=>d.querySelector('h3')?.textContent==='Company & Resources');
 if(info){[['SIP Spending Calculator','sip-trunk-pricing-estimator'],['Partner Application','become-a-partner']].forEach(([label,slug])=>{if(!info.querySelector('a[href="/sg/'+slug+'/"]')){const a=document.createElement('a');a.href='/sg/'+slug+'/';a.textContent=label;info.append(a);}});}
})();

// Derive footer navigation from the header so categories and labels stay aligned.
(()=>{
 const nav=document.querySelector('#navigation');
 const grid=document.querySelector('footer .footer-grid');
 if(!nav||!grid)return;
 const brand=grid.querySelector('.footer-brand');
 if(!brand)return;
 const makeGroup=(source)=>{
  const group=document.createElement('details');group.className='footer-nav-group';
  const heading=document.createElement('summary');
  const original=source.querySelector(':scope > summary');
  heading.textContent=[...original.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();
  group.append(heading);
  const links=document.createElement('div');links.className='footer-group-links';
  source.querySelectorAll('a[href]').forEach(a=>{const copy=a.cloneNode(true);copy.querySelectorAll('small,span[aria-hidden]').forEach(n=>n.remove());copy.removeAttribute('class');copy.textContent=copy.textContent.trim();links.append(copy);});
  group.append(links);return group;
 };
 grid.replaceChildren(brand);grid.className='container footer-grid footer-matched';
 nav.querySelectorAll('.service-menu-column').forEach(column=>{
  const dest=document.createElement('div');dest.className='footer-service-column';
  column.querySelectorAll('.service-menu-group').forEach(group=>dest.append(makeGroup(group)));
  grid.append(dest);
 });
 const directory=document.createElement('div');directory.className='footer-directory';
 nav.querySelectorAll(':scope > .nav-dropdown:not(.services-menu)').forEach(source=>{
  const group=makeGroup(source);
  if(group.querySelector('summary').textContent==='Company'){
   const a=document.createElement('a');a.href='/sg/become-a-partner/';a.textContent='Partner Application';group.querySelector('.footer-group-links').append(a);
  }
  directory.append(group);
 });
 grid.append(directory);
 const mobile=matchMedia('(max-width:700px)');
 const groups=[...grid.querySelectorAll('.footer-nav-group')];
 const sync=()=>groups.forEach(g=>g.open=!mobile.matches);
 groups.forEach(g=>g.querySelector('summary').addEventListener('click',e=>{if(!mobile.matches)e.preventDefault();}));
 mobile.addEventListener('change',sync);sync();
})();
