// ===== SHARED PREMIUM JS FOR ALL PAGES =====

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  const fill = document.querySelector('.preloader-fill');
  if (fill) fill.style.width = '100%';
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.style.display = 'none', 600);
  }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  initParticles();
  initScrollReveal();
  initBackToTop();
  initSearch();
  initNotifications();
  initThemeToggle();
  initCounters();
  setActiveNavLink();
});

// ===== CUSTOM CURSOR =====
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let mX=0,mY=0,rX=0,rY=0;
  document.addEventListener('mousemove',e=>{mX=e.clientX;mY=e.clientY;dot.style.left=mX+'px';dot.style.top=mY+'px';});
  (function ar(){rX+=(mX-rX)*0.12;rY+=(mY-rY)*0.12;ring.style.left=rX+'px';ring.style.top=rY+'px';requestAnimationFrame(ar);})();
  document.querySelectorAll('a,button,.fcard,.city-card,.mcard,.tcard,.lcard,.ecard,.team-card,.resource-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.classList.add('expanded');dot.classList.add('hidden');});
    el.addEventListener('mouseleave',()=>{ring.classList.remove('expanded');dot.classList.remove('hidden');});
  });
}

// ===== NAVBAR =====
function initNavbar() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      if (navLinks) navLinks.classList.toggle('open');
    });
  }
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== SET ACTIVE NAV =====
function setActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === path || (path === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
}

// ===== PARTICLES =====
function initParticles() {
  const pb = document.getElementById('particlesBg');
  if (!pb) return;
  for(let i=0;i<20;i++){
    const p=document.createElement('div');p.className='particle';
    p.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${2+Math.random()*3}px;height:${2+Math.random()*3}px;animation-delay:${Math.random()*8}s;animation-duration:${6+Math.random()*10}s;`;
    pb.appendChild(p);
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('revealed'); });
  }, {threshold:0.07, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.rs,.rc').forEach(el => obs.observe(el));
}

// ===== COUNTERS =====
function initCounters() {
  const cobs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.querySelectorAll('[data-count]').forEach(el => {
          const t = parseInt(el.getAttribute('data-count'));
          let c = 0; const step = t/(2000/16);
          const timer = setInterval(()=>{c=Math.min(c+step,t);el.textContent=Math.floor(c).toLocaleString();if(c>=t)clearInterval(timer);},16);
        });
        cobs.unobserve(e.target);
      }
    });
  }, {threshold:0.5});
  document.querySelectorAll('.hero-stats,.stats-row,.stats-band').forEach(el => cobs.observe(el));
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

// ===== SEARCH =====
function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  
  const pages = [
    {title:'Home',url:'index.html',desc:'Welcome to Sundarbans House',icon:'🏠'},
    {title:'Study Corner',url:'study.html',desc:'Academic resources and materials',icon:'📚'},
    {title:'Events',url:'events.html',desc:'Upcoming events, workshops and competitions',icon:'🎯'},
    {title:'Gallery',url:'gallery.html',desc:'Photos and memories from our community',icon:'🖼️'},
    {title:'Meetups',url:'meetups.html',desc:'City meetups across India',icon:'📍'},
    {title:'About',url:'about.html',desc:'About Sundarbans House and our mission',icon:'ℹ️'},
    {title:'Community',url:'community.html',desc:'Tech, Cultural and Academic communities',icon:'🤝'},
    {title:'Teams',url:'teams.html',desc:'Meet our leadership and team members',icon:'👥'},
    {title:'Contact',url:'contact.html',desc:'Get in touch with us',icon:'📧'},
    {title:'Social Media',url:'social.html',desc:'Follow us on social platforms',icon:'📱'},
    {title:'Members Lounge',url:'sundarbans/login.html',desc:'Login to members area',icon:'🔐'},
    {title:'Delhi Meetup',url:'meetups/regions/delhi.html',desc:'Delhi chapter meetups',icon:'🏙️'},
    {title:'Mumbai Meetup',url:'meetups/regions/mumbai.html',desc:'Mumbai chapter meetups',icon:'🌊'},
    {title:'Bangalore Meetup',url:'meetups/regions/bangalore.html',desc:'Bangalore chapter meetups',icon:'💻'},
    {title:'Kolkata Meetup',url:'meetups/regions/kolkata.html',desc:'Kolkata chapter meetups',icon:'🎭'},
  ];

  function renderResults(query) {
    const list = document.getElementById('searchResults');
    if (!list) return;
    if (!query.trim()) { list.innerHTML = '<div class="search-empty">Start typing to search...</div>'; return; }
    const filtered = pages.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.desc.toLowerCase().includes(query.toLowerCase()));
    if (!filtered.length) { list.innerHTML = '<div class="search-empty">No results found for "'+query+'"</div>'; return; }
    list.innerHTML = filtered.map(p => `<a href="${p.url}" class="search-result-item"><div class="sri-icon">${p.icon}</div><div><div class="sri-title">${p.title}</div><div class="sri-desc">${p.desc}</div></div></a>`).join('');
  }

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener('click', () => { searchOverlay.classList.add('open'); setTimeout(()=>searchInput && searchInput.focus(),100); });
    searchClose && searchClose.addEventListener('click', () => searchOverlay.classList.remove('open'));
    searchOverlay.addEventListener('click', e => { if(e.target === searchOverlay) searchOverlay.classList.remove('open'); });
    searchInput && searchInput.addEventListener('input', e => renderResults(e.target.value));
    document.addEventListener('keydown', e => { if(e.key==='Escape') searchOverlay.classList.remove('open'); if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();searchOverlay.classList.add('open');setTimeout(()=>searchInput&&searchInput.focus(),100);} });
    renderResults('');
  }
}

// ===== NOTIFICATIONS =====
function initNotifications() {
  const btn = document.getElementById('notifBtn');
  const panel = document.getElementById('notifPanel');
  const badge = document.getElementById('notifBadge');
  
  const notifs = [
    {icon:'🎓',title:'New Study Material',desc:'Maths Chapter 5 uploaded',time:'2h ago',unread:true},
    {icon:'🏆',title:'Community Milestone',desc:'5000+ members reached!',time:'5h ago',unread:true},
    {icon:'📅',title:'Event Reminder',desc:'Tech Talk starts in 2 hours',time:'1d ago',unread:true},
    {icon:'🌟',title:'Achievement Unlocked',desc:'Sundarbans ranked #1 this week',time:'2d ago',unread:false},
    {icon:'📢',title:'Announcement',desc:'Delhi Meetup registrations open',time:'3d ago',unread:false},
  ];

  function renderNotifs() {
    const list = document.getElementById('notifList');
    if (!list) return;
    list.innerHTML = notifs.map((n,i) => `
      <div class="notif-item ${n.unread?'unread':''}" onclick="markRead(${i})">
        <div class="notif-icon">${n.icon}</div>
        <div class="notif-body"><div class="notif-title">${n.title}</div><div class="notif-desc">${n.desc}</div><div class="notif-time">${n.time}</div></div>
        ${n.unread?'<div class="notif-dot"></div>':''}
      </div>`).join('');
    const unreadCount = notifs.filter(n=>n.unread).length;
    if (badge) { badge.textContent = unreadCount; badge.style.display = unreadCount?'flex':'none'; }
  }

  window.markRead = (i) => { notifs[i].unread = false; renderNotifs(); };
  window.markAllRead = () => { notifs.forEach(n=>n.unread=false); renderNotifs(); };

  if (btn && panel) {
    btn.addEventListener('click', e => { e.stopPropagation(); panel.classList.toggle('open'); });
    document.addEventListener('click', e => { if(!panel.contains(e.target)&&e.target!==btn) panel.classList.remove('open'); });
  }
  renderNotifs();
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('sb-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sb-theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===== COUNTDOWN (shared) =====
function startCountdown(targetDate, elementId) {
  function update() {
    const el = document.getElementById(elementId);
    if (!el) return;
    const now = new Date();
    const diff = targetDate - now;
    if (diff <= 0) { el.innerHTML = '<span class="cd-over">Event Started!</span>'; return; }
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);
    el.innerHTML = `<div class="cd-unit"><span class="cd-num">${String(d).padStart(2,'0')}</span><span class="cd-label">days</span></div><div class="cd-sep">:</div><div class="cd-unit"><span class="cd-num">${String(h).padStart(2,'0')}</span><span class="cd-label">hrs</span></div><div class="cd-sep">:</div><div class="cd-unit"><span class="cd-num">${String(m).padStart(2,'0')}</span><span class="cd-label">min</span></div><div class="cd-sep">:</div><div class="cd-unit"><span class="cd-num">${String(s).padStart(2,'0')}</span><span class="cd-label">sec</span></div>`;
  }
  update();
  setInterval(update, 1000);
}
