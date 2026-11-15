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
