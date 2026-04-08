lucide.createIcons();

(function(){
  const btn=document.querySelector('[data-theme-toggle]');
  const root=document.documentElement;
  let theme=root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light');
  root.setAttribute('data-theme',theme);

  const paint=()=>{
    btn.innerHTML=theme==='dark'
      ? '<i data-lucide="sun" width="18" height="18"></i>'
      : '<i data-lucide="moon" width="18" height="18"></i>';
    lucide.createIcons();
  };

  paint();

  btn.addEventListener('click',()=>{
    theme=theme==='dark'?'light':'dark';
    root.setAttribute('data-theme',theme);
    paint();
  });
})();

const menuBtn=document.getElementById('menuBtn');
const mobileMenu=document.getElementById('mobileMenu');

menuBtn.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
});

mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mobileMenu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
}));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const sections=document.querySelectorAll('section[id],header[id]');
const links=document.querySelectorAll('.nav__links a');

const spy=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(link=>{
        link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id);
      });
    }
  });
},{rootMargin:'-45% 0px -45% 0px'});

sections.forEach(sec=>spy.observe(sec));