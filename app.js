const LS="hashem_life_os_v2";
let state=loadState(), currentPage="dashboard", selectedDate=today();

const $=id=>document.getElementById(id);
function today(){return new Date().toISOString().slice(0,10)}
function defaultState(){return{
 settings:{start:today(),end:addDays(today(),56)},
 profile:{
   name:"Hashem Hamasha",
   degree:"Bachelor of Software Engineering",
   university:"Jordan University of Science and Technology (JUST)",
   graduation:"2026",
   goal:"Software Engineer",
   period:"8 weeks",
   dailyHours:8
 },
 days:{}, plan:{},
 english:{modules:{},speaking:[]},
 software:{},
 projects:{
   "Job Application Tracker":{progress:0,status:"Planned",note:"CRUD + APIs + deployment + testing"},
   "Customer Management":{progress:0,status:"Planned",note:"Next.js 16 + TypeScript + Tailwind + Prisma + PostgreSQL/Supabase"},
   "TREAQ — Graduation Project":{progress:0,status:"Planned",note:"C# + ASP.NET MVC + Entity Framework + SQL Server"},
   "Campus Event System":{progress:0,status:"Planned",note:"Java Servlets + JSP + MySQL + MVC"},
   "Portfolio":{progress:0,status:"Planned",note:"React + TypeScript + Tailwind"},
   "PLUGIX":{progress:0,status:"Planned",note:"Next.js + TypeScript + Prisma + Auth + Admin + Store + Orders"},
   "Qareen":{progress:0,status:"Planned",note:"Next.js 16 + TypeScript + Tailwind + Prisma + PostgreSQL"}
 },
 specialization:{experiments:[],scores:{}},
 career:{},
 cv:{},
 learning:{
   method:"Learn → Understand → Practice → Build → Explain → Review → Repeat",
   rules:[
     "ابدأ بالمفهوم قبل الـframework.",
     "بعد كل درس اكتب الفكرة بكلماتك بدون نسخ.",
     "طبّق مثالًا صغيرًا من الصفر.",
     "حل تمرينًا أو مشكلة بدون مشاهدة الحل.",
     "اربط المفهوم بمشروع حقيقي.",
     "اشرح ما تعلمته بصوتك كأنك في مقابلة.",
     "في نهاية اليوم سجّل: ماذا تعلمت؟ ماذا أخطأت؟ ماذا ستراجع؟"
   ]
 },
 reviews:{},
 health:{}
}}
function addDays(date,n){let d=new Date(date+"T12:00:00");d.setDate(d.getDate()+n);return d.toISOString().slice(0,10)}
function mergeDeep(base,extra){
  Object.keys(extra||{}).forEach(function(k){
    if(extra[k] && typeof extra[k]==="object" && !Array.isArray(extra[k]) && base[k] && typeof base[k]==="object" && !Array.isArray(base[k])){
      mergeDeep(base[k],extra[k]);
    }else{base[k]=extra[k]}
  });
  return base;
}
function loadState(){
  try{return mergeDeep(defaultState(),JSON.parse(localStorage.getItem(LS)||"{}"))}
  catch{return defaultState()}
}
function persist(){localStorage.setItem(LS,JSON.stringify(state)); renderAll(); scheduleCloudSync()}
function todayDay(){return state.days[selectedDate]||{hours:{se:0,en:0,project:0,spec:0,career:0},tasks:{},done:"",missed:"",learned:""}}
function go(page){currentPage=page;document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"));$(page).classList.add("active");document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===page));if(page==="daily")renderDaily();if(page==="health")renderHealth();window.scrollTo(0,0)}
window.go=go;

const englishModules=[
 ["foundation","General English Foundation"],["listening","Listening"],["speaking","Speaking"],["reading","Reading"],["writing","Writing"],["technical","Technical English"],["communication","Professional Communication"],["interview","Job Interview English"],["ielts","IELTS / Canada Preparation"]
];
const softwareTracks=[
 ["Foundation","Programming Fundamentals","Problem Solving","Data Structures","Algorithms","OOP","Clean Code","SOLID Principles","Design Patterns","Testing & Debugging","Databases / SQL","Operating Systems","Networking / Web Fundamentals","Software Architecture"],
 ["Professional Practice","Git & GitHub","Version Control & Workflow","APIs (REST)","Authentication & Authorization","Security Fundamentals","Testing عمليًا","Docker","CI/CD","Deployment","Cloud Basics","System Design","Documentation","Code Review","Team Workflow (SDLC)","Production Mindset"]
];
const projectDetails=[
 {name:"Job Application Tracker",stack:"Backend + Frontend + Database",focus:"تطبيق عملي على CRUD، APIs، authentication، deployment، واختبار دورة العمل كاملة."},
 {name:"Customer Management",stack:"Next.js 16 + TypeScript + Tailwind + Prisma + PostgreSQL/Supabase",focus:"إدارة العملاء، database design، CRUD، data layer، وتجربة dashboard مرتبة."},
 {name:"TREAQ — Graduation Project",stack:"C# + ASP.NET MVC + Entity Framework + SQL Server",focus:"مشروع التخرج: نظام إدارة صيدلية يطبق MVC، قواعد البيانات، والـbusiness logic."},
 {name:"Campus Event System",stack:"Java Servlets + JSP + MySQL + MVC",focus:"إدارة الفعاليات والتذاكر مع تطبيق MVC وdatabase operations."},
 {name:"Portfolio",stack:"React + TypeScript + Tailwind",focus:"هوية مهنية، عرض المشاريع والمهارات، وتحسين تجربة المستخدم والـUI."},
 {name:"PLUGIX",stack:"Next.js + TypeScript + Prisma + Database",focus:"منتج عملي قابل للتطوير: Auth، Admin، Store، Cart، Orders، Images، Security وUX."},
 {name:"Qareen",stack:"Next.js 16 + TypeScript + Tailwind + Prisma + PostgreSQL",focus:"فكرة Digital Twin بتطبيق معماري حديث مع database schema وتجربة منتج."}
];
const specAreas=["Backend Development","Frontend Development","Full Stack Development",".NET Development","React / Next.js","Database & Data Engineering","Software Architecture","Cloud & DevOps","Cyber Security","AI / Machine Learning","Mobile Development","UI/UX Development"];
const careerItems=["CV احترافي","GitHub Profile مرتب","Portfolio قوي","LinkedIn احترافي","توثيق المشاريع","كتابة وصف قوي لكل مشروع","إبراز المهارات والتقنيات","تحديث مستمر"];
const cvData={
 summary:"Junior Software Engineer and Full Stack Developer with hands-on experience building web applications using ASP.NET MVC, ASP.NET Core, C#, SQL Server, React, TypeScript, Entity Framework, and RESTful APIs. Strong foundation in OOP, Data Structures, Algorithms, Database Design, Software Architecture, SDLC, Agile, testing, troubleshooting, and deployment.",
 education:["Bachelor of Software Engineering — Jordan University of Science and Technology (JUST) — Irbid, Jordan — Graduated June 2026"],
 skills:["C#","JavaScript","TypeScript","Java","C++","Python","React","Next.js","HTML5","CSS3","Tailwind CSS","Responsive Web Design","UI/UX Design","ASP.NET MVC","ASP.NET Core","Entity Framework","RESTful APIs","Authentication & Authorization","CRUD","LINQ","SQL Server","MySQL","PostgreSQL","Oracle Database","Database Design","OOP","Data Structures","Algorithms","SOLID","Design Patterns","MVC Architecture","Onion Architecture","Software Architecture","SDLC","Agile","Code Reviews","Git","GitHub","Postman","Visual Studio","VS Code","Figma","Netlify"],
 experience:[
   ["Software Engineering Trainee","Clever Mind POB ICT","Jul 2025 – Nov 2025","Software development, testing, QA, requirements validation, defect identification, Git/GitHub, Agile, SDLC, project planning and documentation."]
 ],
 projects:[
   ["TREAQ — Pharmacy Management Platform","ASP.NET MVC, C#, Entity Framework, SQL Server, REST APIs, JavaScript, HTML5, CSS3, Git"],
   ["Job Application Tracker","Backend + Frontend + Database + APIs + testing + deployment"],
   ["Customer Management","Next.js 16 + TypeScript + Tailwind + Prisma + PostgreSQL/Supabase"],
   ["Campus Event System","Java Servlets + JSP + MySQL + MVC"],
   ["Personal Portfolio Website","React + TypeScript + Tailwind CSS + Framer Motion + GitHub + Netlify"],
   ["PLUGIX","Next.js + TypeScript + Prisma + Auth + Admin + Store + Orders"],
   ["Qareen","Next.js 16 + TypeScript + Tailwind + Prisma + PostgreSQL"]
 ],
 achievements:[
   "Designed and implemented 4 RESTful APIs and multiple dashboard modules in TREAQ.",
   "Built a full-stack pharmacy platform with authentication, authorization, inventory and operational workflows.",
   "Reduced software bugs by 40% and improved application performance by 30% during testing, debugging and optimization activities.",
   "Developed and deployed a professional responsive portfolio website.",
   "Completed professional QA and Project Management training at Clever Mind POB ICT."
 ],
 certs:["Introduction to Front-End Development – Meta (Coursera)","CCNA: Introduction to Networks – Cisco Networking Academy","Introduction to Modern AI – Cisco Networking Academy","Industrial Cybersecurity Essentials – Cisco Networking Academy","HTML Essentials – Cisco & JS Institute","Discovering Entrepreneurship – Cisco Networking Academy","QA and PM For Mobile Apps and Websites For Developers – Clever Mind POB ICT (30 Hours)"]
};

function renderAll(){renderDashboard();renderPlan();renderEnglish();renderSoftware();renderProjects();renderSpecialization();renderCareer();renderCV();renderReports();loadSettings();renderDaily();renderHealth();renderLearningMethod()}
function renderDashboard(){
 $("dashDate").textContent=new Date(selectedDate+"T12:00:00").toLocaleDateString("ar-JO",{weekday:"long",day:"numeric",month:"long"});
 const d=todayDay(), total=Object.values(d.hours).reduce((a,b)=>a+b,0);
 $("dashHours").textContent=`${total} / 8h`; $("todaySummary").textContent=d.done||"لم تسجل يومك بعد.";
 const end=new Date(state.settings.end+"T23:59:59");$("daysLeft").textContent=Math.max(0,Math.ceil((end-new Date())/86400000));
 $("streak").textContent=calcStreak()+" days";
 const planDone=Object.values(state.plan).filter(Boolean).length, planTotal=48; $("periodProgress").textContent=Math.round(planDone/planTotal*100)+"%";
 $("todayTasks").innerHTML=["se","en","project","spec","career"].map((k,i)=>{let labels=["Software Engineering","English","Projects","Specialization","Career"];return `<div class="mini-task ${d.tasks[k]?'done':''}">${d.tasks[k]?'✓':'○'} ${labels[i]}</div>`}).join("");
 const labels=[["💻 Software",d.hours.se,3],["🇬🇧 English",d.hours.en,2],["🛠️ Projects",d.hours.project,1.5],["🧭 Specialization",d.hours.spec,1],["💼 Career",d.hours.career,.5]];
 $("hourBars").innerHTML=labels.map(x=>`<div class="hour-row"><span>${x[0]}</span><div class="bar"><i style="width:${Math.min(100,x[1]/x[2]*100)}%"></i></div><b>${x[1]}/${x[2]}</b></div>`).join("");
}
function calcStreak(){let n=0,d=new Date();for(let i=0;i<60;i++){let k=d.toISOString().slice(0,10);if(state.days[k])n++;else if(i>0)break;d.setDate(d.getDate()-1)}return n}
function renderDaily(){
 $("dayDate").value=selectedDate;let d=todayDay();
 ["hSe","hEn","hProject","hSpec","hCareer"].forEach((id,i)=>$(id).value=Object.values(d.hours)[i]||"");
 const total=Object.values(d.hours).reduce((a,b)=>a+b,0);$("dailyTotal").textContent=`${total} / 8h`;$("dailyProgress").style.width=Math.min(100,total/8*100)+"%";
 $("done").value=d.done||"";$("missed").value=d.missed||"";$("learned").value=d.learned||"";
 const labels=[["se","💻 Software Engineering — 3h"],["en","🇬🇧 English — 2h"],["project","🛠️ Projects — 1.5h"],["spec","🧭 Specialization — 1h"],["career","💼 Career — 0.5h"]];
 $("dailyChecklist").innerHTML=labels.map(x=>`<label class="check ${d.tasks[x[0]]?'done':''}"><input type="checkbox" data-dtask="${x[0]}" ${d.tasks[x[0]]?'checked':''}>${x[1]}</label>`).join("");
 document.querySelectorAll("[data-dtask]").forEach(c=>c.onchange=e=>{let x=todayDay();x.tasks[e.target.dataset.dtask]=e.target.checked;state.days[selectedDate]=x;persist();renderDaily()});
 const entries=Object.entries(state.days).sort((a,b)=>b[0].localeCompare(a[0])).slice(0,12);
 $("recentDays").innerHTML=entries.length?entries.map(([date,x])=>{let t=Object.values(x.hours).reduce((a,b)=>a+b,0);return `<div class="table-row"><b>${date}</b><span>${x.done?x.done.slice(0,80):"—"}</span><span class="badge ${t>=8?'good':''}">${t}h / 8h</span></div>`}).join(""):"<div class='empty'>لا يوجد سجل بعد.</div>";
}
["hSe","hEn","hProject","hSpec","hCareer"].forEach(id=>$(id).oninput=()=>{let x=todayDay();x.hours={se:+$("hSe").value||0,en:+$("hEn").value||0,project:+$("hProject").value||0,spec:+$("hSpec").value||0,career:+$("hCareer").value||0};let t=Object.values(x.hours).reduce((a,b)=>a+b,0);$("dailyTotal").textContent=`${t} / 8h`;$("dailyProgress").style.width=Math.min(100,t/8*100)+"%"});
$("dayDate").onchange=e=>{selectedDate=e.target.value;renderDaily()}
$("saveDay").onclick=()=>{let x=todayDay();x.hours={se:+$("hSe").value||0,en:+$("hEn").value||0,project:+$("hProject").value||0,spec:+$("hSpec").value||0,career:+$("hCareer").value||0};x.done=$("done").value;x.missed=$("missed").value;x.learned=$("learned").value;state.days[selectedDate]=x;persist();$("saveMsg").textContent="تم الحفظ ✓";setTimeout(()=>$("saveMsg").textContent="",2000)}


function renderPlan(){
  const weeks={
    1:["Programming Fundamentals","General English + daily listening","Audit all 7 projects","Baseline specialization ratings","GitHub profile baseline","Keep health separate from 8h"],
    2:["Problem Solving","Listening + Speaking","Job Application Tracker + Customer Management review","Backend / Frontend / Full Stack experiments","Clean GitHub repos + READMEs","Weekly health trend"],
    3:["Data Structures","Technical English + vocabulary","TREAQ + Campus Event System review","Database + Architecture experiment","Project descriptions + tech mapping","Weekly review"],
    4:["Algorithms + Big-O","Speaking + Interview English","Portfolio + PLUGIX sprint","React/Next + backend experiment","CV first strong draft","Weekly review"],
    5:["OOP + Clean Code + SOLID + Patterns","Professional Communication + writing","Qareen architecture/code review","Cloud / DevOps / Security / AI experiments","LinkedIn + Portfolio content","Weekly review"],
    6:["SQL + OS + Networking/Web","IELTS / Canada preparation","Testing + security + documentation","Compare specialization experiments","CV + GitHub refinement","Weekly review"],
    7:["REST + Auth + Security + Testing","Mock interviews + technical speaking","Docker + deployment + production readiness","Repeat strongest experiments","CV + LinkedIn + Portfolio consistency","Weekly review"],
    8:["Docker + CI/CD + Cloud + System Design","Final interview simulation","Final polish of strongest projects","Evidence-based direction summary","Final career checklist","8-week review"]
  };
  $("weeks").innerHTML=Object.entries(weeks).map(function(entry){
    const w=entry[0],tasks=entry[1];
    const done=tasks.filter(function(_,i){return !!state.plan[w+"-"+i]}).length;
    const items=tasks.map(function(task,i){
      const key=w+"-"+i;
      return '<label class="week-task '+(state.plan[key]?'done':'')+'"><input type="checkbox" data-plan="'+key+'" '+(state.plan[key]?'checked':'')+'>'+task+'</label>';
    }).join("");
    return '<div class="week"><div class="week-head"><h2>الأسبوع '+w+'</h2><span class="badge">'+done+'/'+tasks.length+'</span></div><div class="week-tasks">'+items+'</div></div>';
  }).join("");
  document.querySelectorAll("[data-plan]").forEach(function(el){
    el.onchange=function(e){state.plan[e.target.dataset.plan]=e.target.checked;persist()};
  });
}

function renderEnglish(){
  const done=Object.values(state.english.modules).filter(Boolean).length;
  const minutes=state.english.speaking.reduce(function(sum,x){return sum+(Number(x.minutes)||0)},0);
  $("englishMetrics").innerHTML=[
    ["Modules Completed",done+"/9"],
    ["Speaking Sessions",state.english.speaking.length],
    ["Speaking Minutes",minutes],
    ["Goal","Work + Study + Life"]
  ].map(function(x){return '<div class="metric"><span>'+x[0]+'</span><b>'+x[1]+'</b></div>'}).join("");
  $("englishModules").innerHTML=englishModules.map(function(x){
    return '<label class="module"><input type="checkbox" data-en="'+x[0]+'" '+(state.english.modules[x[0]]?'checked':'')+'><b>'+x[1]+'</b><span>'+(state.english.modules[x[0]]?'Completed':'In progress')+'</span></label>';
  }).join("");
  document.querySelectorAll("[data-en]").forEach(function(el){
    el.onchange=function(e){state.english.modules[e.target.dataset.en]=e.target.checked;persist()};
  });
  $("speakingHistory").innerHTML=state.english.speaking.map(function(x){
    return '<div class="table-row"><b>'+escapeHtml(x.date)+'</b><span>'+escapeHtml(x.topic)+'</span><span class="badge">'+(Number(x.minutes)||0)+' min</span></div>';
  }).join("") || '<div class="empty">لا توجد جلسات بعد.</div>';
}
if($("downloadCV"))$("downloadCV").onclick=downloadCV;
if($("printCV"))$("printCV").onclick=printCV;
$("saveSpeaking").onclick=function(){
  if(!$("speakTopic").value.trim())return;
  state.english.speaking.unshift({date:today(),topic:$("speakTopic").value.trim(),minutes:Number($("speakMinutes").value)||0,notes:$("speakNotes").value.trim()});
  $("speakTopic").value="";$("speakMinutes").value="";$("speakNotes").value="";
  persist();
};
function renderSoftware(){let saved=state.software; $("softwareTracks").innerHTML=softwareTracks.map((track,ti)=>{let done=track.slice(1).filter(x=>saved[x]).length;return `<div class="track"><div class="card-head"><div><b>${ti+1}. ${track[0]}</b><span>${done}/${track.length-1} completed</span></div><span class="badge">${Math.round(done/(track.length-1)*100)}%</span></div>${track.slice(1).map(x=>`<label class="check ${saved[x]?'done':''}"><input type="checkbox" data-soft="${x}" ${saved[x]?'checked':''}>${x}</label>`).join("")}</div>`}).join("");document.querySelectorAll("[data-soft]").forEach(x=>x.onchange=e=>{state.software[e.target.dataset.soft]=e.target.checked;persist();renderSoftware()})}

function renderProjects(){
 $("projectsGrid").innerHTML=projectDetails.map((p,i)=>{
   let d=state.projects[p.name]||{progress:0,status:"Planned",note:""};
   return `<div class="project">
     <div class="project-top"><b>${i+1}. ${p.name}</b><span class="badge">${d.status}</span></div>
     <span class="project-stack">${p.stack}</span>
     <span class="project-focus">${p.focus}</span>
     <div class="bar"><i style="width:${d.progress}%"></i></div>
     <div class="row"><small>${d.progress}%</small><input data-prog="${p.name}" type="range" min="0" max="100" value="${d.progress}" style="width:75%"></div>
     <input data-note="${p.name}" placeholder="ماذا تريد تحسينه؟" value="${escapeHtml(d.note||"")}">
     <button class="secondary" data-saveproj="${p.name}">حفظ</button>
   </div>`
 }).join("");
 document.querySelectorAll("[data-saveproj]").forEach(b=>b.onclick=()=>{
   let p=b.dataset.saveproj;
   state.projects[p]={progress:+document.querySelector(`[data-prog="${CSS.escape(p)}"]`).value,status:state.projects[p]?.status||"In Progress",note:document.querySelector(`[data-note="${CSS.escape(p)}"]`).value};
   persist();renderProjects()
 })
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function renderSpecialization(){ $("specAreas").innerHTML=specAreas.map(a=>`<div class="spec-item"><b>${a}</b><span>سجّل تقييمك بعد تجربة فعلية</span><div class="spec-score">${state.specialization.scores[a]||0}/10</div><input data-score="${a}" type="range" min="0" max="10" value="${state.specialization.scores[a]||0}"></div>`).join("");document.querySelectorAll("[data-score]").forEach(x=>x.oninput=e=>{state.specialization.scores[e.target.dataset.score]=+e.target.value;persist()});$("expArea").innerHTML=specAreas.map(x=>`<option>${x}</option>`).join("");$("expHistory").innerHTML=state.specialization.experiments.map(x=>`<div class="table-row"><b>${x.date}</b><span>${x.area} — ${x.task}</span><span>${x.note||""}</span></div>`).join("")||"<div class='empty'>لا توجد تجارب بعد.</div>"}
$("saveExp").onclick=()=>{state.specialization.experiments.unshift({date:today(),area:$("expArea").value,task:$("expTask").value,note:$("expNote").value});$("expTask").value="";$("expNote").value="";persist();renderSpecialization()}

function renderCV(){
  if(!$("cvName"))return;
  $("cvName").textContent=state.profile.name||"Hashem Hamasha";
  $("cvHeadline").textContent="Junior Software Engineer · Full Stack Developer";
  $("cvSummary").textContent=cvData.summary;
  $("cvEducation").innerHTML=cvData.education.map(x=>"<p>"+escapeHtml(x)+"</p>").join("");
  $("cvSkills").innerHTML=cvData.skills.map(x=>"<span class='tag'>"+escapeHtml(x)+"</span>").join("");
  $("cvExperience").innerHTML=cvData.experience.map(x=>"<div><b>"+escapeHtml(x[0])+"</b><span>"+escapeHtml(x[1])+" · "+escapeHtml(x[2])+"</span><p>"+escapeHtml(x[3])+"</p></div>").join("");
  $("cvProjects").innerHTML=cvData.projects.map(x=>"<div><b>"+escapeHtml(x[0])+"</b><span>"+escapeHtml(x[1])+"</span></div>").join("");
  $("cvAchievements").innerHTML=cvData.achievements.map(x=>"<div>• "+escapeHtml(x)+"</div>").join("");
  $("cvCerts").innerHTML=cvData.certs.map(x=>"<div><b>"+escapeHtml(x)+"</b></div>").join("");
}
function cvPrintableHTML(){
  const skills=cvData.skills.join(" · ");
  const projects=cvData.projects.map(x=>"<p><b>"+escapeHtml(x[0])+"</b><br>"+escapeHtml(x[1])+"</p>").join("");
  const experience=cvData.experience.map(x=>"<p><b>"+escapeHtml(x[0])+"</b> — "+escapeHtml(x[1])+"<br>"+escapeHtml(x[2])+"<br>"+escapeHtml(x[3])+"</p>").join("");
  const achievements=cvData.achievements.map(x=>"<li>"+escapeHtml(x)+"</li>").join("");
  const certs=cvData.certs.map(x=>"<li>"+escapeHtml(x)+"</li>").join("");
  return "<!doctype html><html><head><meta charset='utf-8'><title>Hashem Hamasha CV</title><style>body{font-family:Arial,sans-serif;max-width:820px;margin:32px auto;color:#172033;line-height:1.45}h1{margin:0 0 4px}h2{font-size:15px;border-bottom:2px solid #172033;padding-bottom:4px;margin-top:20px}p{margin:6px 0;font-size:11px}.meta{font-size:10px;color:#475467}.skills{font-size:10px}.two{display:grid;grid-template-columns:1fr 1fr;gap:20px}@media print{body{margin:0}}</style></head><body><h1>HASHEM BASHAR MOHAMMAD HAMASHA</h1><b>JUNIOR SOFTWARE ENGINEER | FULL STACK DEVELOPER</b><div class='meta'>00962-770276749 · hashembashahamasha@gmail.com · Amman, Jordan · https://hashem-hamasha.netlify.app</div><h2>PROFESSIONAL SUMMARY</h2><p>"+escapeHtml(cvData.summary)+"</p><h2>EXPERIENCE</h2>"+experience+"<h2>PROJECTS</h2>"+projects+"<h2>TECHNICAL SKILLS</h2><p class='skills'>"+escapeHtml(skills)+"</p><div class='two'><div><h2>EDUCATION</h2><p>"+escapeHtml(cvData.education[0])+"</p></div><div><h2>CERTIFICATIONS</h2><ul>"+certs+"</ul></div></div><h2>ACHIEVEMENTS</h2><ul>"+achievements+"</ul></body></html>";
}
function printCV(){
  const w=window.open("","_blank","width=900,height=900");
  if(!w)return;
  w.document.write(cvPrintableHTML());
  w.document.close();
  setTimeout(()=>w.print(),400);
}
function downloadCV(){
  // Browser-native print dialog lets the user choose "Save as PDF" without exposing private data to a third-party PDF service.
  printCV();
}

function renderLearningMethod(){
  const el=$("learningMethod");
  if(!el)return;
  el.innerHTML='<div class="learning-flow"><b>Learn</b><span>افهم المفهوم</span><b>Practice</b><span>طبّق</span><b>Build</b><span>اربطه بمشروع</span><b>Explain</b><span>اشرحه بصوتك</span><b>Review</b><span>راجع أخطاءك</span></div><ul>'+state.learning.rules.map(x=>"<li>"+escapeHtml(x)+"</li>").join("")+"</ul>";
}
{$("careerItems").innerHTML=careerItems.map(x=>`<label class="career-item"><div><b>${x}</b><span>${state.career[x]?'Completed':'Not completed'}</span></div><input data-career="${x}" type="checkbox" ${state.career[x]?'checked':''}></label>`).join("");document.querySelectorAll("[data-career]").forEach(x=>x.onchange=e=>{state.career[e.target.dataset.career]=e.target.checked;persist()})}

function renderHealth(){
  const d=state.health[selectedDate]||{};
  $("healthWeight").value=d.weight??"";
  $("healthSleep").value=d.sleep??"";
  $("healthWorkout").checked=!!d.workout;
  $("healthWater").checked=!!d.water;

  const entries=Object.entries(state.health||{}).sort((a,b)=>b[0].localeCompare(a[0]));
  const vals=entries.map(x=>x[1]).filter(Boolean);
  const latest=vals.find(x=>x.weight!==""&&x.weight!=null);
  $("lastWeight").textContent=latest?Number(latest.weight).toLocaleString("en-US")+" kg":"—";

  const sleeps=vals.filter(x=>x.sleep!==""&&x.sleep!=null).map(x=>Number(x.sleep)).filter(Number.isFinite);
  $("avgSleep").textContent=sleeps.length?(sleeps.reduce((a,b)=>a+b,0)/sleeps.length).toFixed(1)+"h":"—";
  $("workoutDays").textContent=vals.filter(x=>x.workout).length;
}

function saveHealth(){
  try{
    const weight=$("healthWeight").value.trim();
    const sleep=$("healthSleep").value.trim();
    if(!weight && !sleep && !$("healthWorkout").checked && !$("healthWater").checked){
      alert("أدخل وزن أو نوم أو اختر حالة التمرين/الماء أولًا.");
      return;
    }
    if(weight && (!Number.isFinite(Number(weight)) || Number(weight)<=0 || Number(weight)>500)){
      alert("أدخل وزنًا صحيحًا.");
      return;
    }
    if(sleep && (!Number.isFinite(Number(sleep)) || Number(sleep)<0 || Number(sleep)>24)){
      alert("أدخل عدد ساعات نوم صحيح.");
      return;
    }

    if(!state.health || typeof state.health!=="object" || Array.isArray(state.health)) state.health={};

    state.health[selectedDate]={
      weight:weight,
      sleep:sleep,
      workout:$("healthWorkout").checked,
      water:$("healthWater").checked
    };

    persist();
    renderHealth();

    const button=$("saveHealth");
    if(button){
      const original=button.textContent;
      button.textContent="تم الحفظ ✓";
      button.disabled=true;
      setTimeout(()=>{button.textContent=original;button.disabled=false},1200);
    }
  }catch(e){
    console.error("Health save error:",e);
    alert("تعذر حفظ بيانات الصحة: "+(e?.message||String(e)));
  }
}

function renderReports(){let entries=Object.entries(state.days),hours=entries.reduce((s,[,d])=>s+Object.values(d.hours).reduce((a,b)=>a+b,0),0);let avg=entries.length?hours/entries.length:0;$("reportMetrics").innerHTML=[["Days Logged",entries.length],["Total Hours",hours.toFixed(1)+"h"],["Average / Day",avg.toFixed(1)+"h"],["8h Days",entries.filter(([,d])=>Object.values(d.hours).reduce((a,b)=>a+b,0)>=8).length]].map(x=>`<div class="metric"><span>${x[0]}</span><b>${x[1]}</b></div>`).join("");let rows=[];for(let i=6;i>=0;i--){let date=addDays(today(),-i),d=state.days[date],h=d?Object.values(d.hours).reduce((a,b)=>a+b,0):0;rows.push(`<div class="hour-row"><span>${date}</span><div class="bar"><i style="width:${Math.min(100,h/8*100)}%"></i></div><b>${h}h</b></div>`)}$("weeklyBars").innerHTML=rows.join("");let r=state.reviews[weekKey()]||{};$("reviewWin").value=r.win||"";$("reviewBlock").value=r.block||"";$("reviewNext").value=r.next||""}
function weekKey(){let d=new Date(),one=new Date(d.getFullYear(),0,1);return "w"+Math.ceil((((d-one)/86400000)+one.getDay()+1)/7)}
$("saveReview").onclick=()=>{state.reviews[weekKey()]={win:$("reviewWin").value,block:$("reviewBlock").value,next:$("reviewNext").value};persist();renderReports()}

function loadSettings(){$("startDate").value=state.settings.start;$("endDate").value=state.settings.end;loadCloudConfig()}
$("saveSettings").onclick=()=>{
  const start=$("startDate").value,end=$("endDate").value;
  if(!start||!end)return alert("حدد تاريخ البداية والنهاية.");
  if(end<start)return alert("تاريخ النهاية يجب أن يكون بعد تاريخ البداية.");
  state.settings.start=start;
  state.settings.end=end;
  persist();
  alert("تم حفظ الفترة ✓");
}
function exportData(){let blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="hashem-life-os-backup-"+today()+".json";a.click()}
$("exportData").onclick=exportData;
$("importData").onchange=e=>{
  let f=e.target.files[0];
  if(!f)return;
  let r=new FileReader();
  r.onload=()=>{
    try{
      const imported=JSON.parse(r.result);
      if(!imported || typeof imported!=="object" || Array.isArray(imported))throw new Error("invalid");
      state=mergeDeep(defaultState(),imported);
      persist();
      alert("تم استرجاع النسخة ✓");
    }catch{
      alert("الملف غير صالح أو ليس Backup من النظام.");
    }finally{
      e.target.value="";
    }
  };
  r.readAsText(f)
}
$("resetData").onclick=()=>{if(confirm("سيتم حذف بيانات هذا المتصفح فقط. نسخة Cloud لن تُحذف. احتفظ بنسخة Export أولًا. هل تريد المتابعة؟")){localStorage.removeItem(LS);localStorage.removeItem("hashem_life_os_unlocked");location.reload()}}



const FIXED_PASSWORD=["20","03"].join("");
const CLOUD_CFG="hashem_supabase_cloud_v3";
const SUPABASE_URL="https://lepffckwdmrcckxnnfdx.supabase.co";
let supabaseClient=null, cloudUser=null, cloudTimer=null;

function setCloudStatus(label,ok){const el=$("cloudStatus");if(el){el.textContent=label;el.className="badge "+(ok?"good":"")}}
function cloudMessage(msg,good){const el=$("cloudMessage");if(el){el.textContent=msg;el.style.color=good?"#237a42":"#b42318"}}
function authMessage(msg,good=false){const el=$("authMessage");if(el){el.textContent=msg;el.style.color=good?"#237a42":"#b42318"}}
function saveCloudKey(key){if(key)localStorage.setItem(CLOUD_CFG,JSON.stringify({url:SUPABASE_URL,key:key}))}
function loadCloudConfig(){
  try{
    let cfg=JSON.parse(localStorage.getItem(CLOUD_CFG)||"null");
    if(!cfg?.key){
      const old=JSON.parse(localStorage.getItem("hashem_supabase_cloud_v2")||localStorage.getItem("hashem_supabase_cloud_v1")||localStorage.getItem("hashem_supabase_config_v1")||"null");
      if(old?.key){cfg={url:SUPABASE_URL,key:old.key};saveCloudKey(old.key)}
    }
    if(cfg?.key&&$("cloudKey"))$("cloudKey").value=cfg.key;
    return cfg;
  }catch{return null}
}
function initSupabase(){
  if(!window.supabase?.createClient)throw new Error("Supabase SDK لم تُحمّل. حدّث الصفحة.");
  const cfg=loadCloudConfig();
  if(!cfg?.key)throw new Error("أدخل Publishable Key أولًا.");
  if(!supabaseClient)supabaseClient=window.supabase.createClient(SUPABASE_URL,cfg.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
  return supabaseClient;
}
async function ensureCloudSession(){
  initSupabase();
  let {data,error}=await supabaseClient.auth.getSession();
  if(error)throw error;
  if(!data.session){
    const result=await supabaseClient.auth.signInAnonymously();
    if(result.error)throw result.error;
    data={session:result.data.session};
  }
  if(!data.session?.user)throw new Error("تعذر إنشاء جلسة Cloud.");
  cloudUser=data.session.user;
  return data.session;
}
async function afterAuth(user){
  cloudUser=user;
  if($("accountStatus"))$("accountStatus").textContent="Anonymous Cloud Session — متصل";
  if($("userAccountStatus"))$("userAccountStatus").textContent="Cloud Connected";
  setCloudStatus("Cloud Connected",true);
  const {data,error}=await supabaseClient.from("user_dashboard_data").select("payload,updated_at").eq("user_id",user.id).maybeSingle();
  if(error)throw error;
  if(data?.payload){
    state=mergeDeep(defaultState(),data.payload);
    localStorage.setItem(LS,JSON.stringify(state));
    renderAll();
    cloudMessage("تم تحميل بياناتك من Cloud ✓",true);
  }else{
    await pushDatabase(true);
    cloudMessage("تم إنشاء نسخة Cloud لبياناتك ✓",true);
  }
}
async function pushDatabase(force=false){
  if(!supabaseClient||!cloudUser)return false;
  const payload=JSON.parse(JSON.stringify(state));
  const {error}=await supabaseClient.from("user_dashboard_data").upsert({user_id:cloudUser.id,payload:payload,updated_at:new Date().toISOString()},{onConflict:"user_id"});
  if(error)throw error;
  setCloudStatus("Cloud Synced",true);
  if(force)cloudMessage("تم حفظ بياناتك في Cloud ✓",true);
  return true;
}
function scheduleCloudSync(){
  if(!supabaseClient||!cloudUser)return;
  clearTimeout(cloudTimer);
  cloudTimer=setTimeout(async()=>{
    try{await pushDatabase(false)}
    catch(e){console.error("Cloud sync error:",e);cloudMessage("تعذر مزامنة آخر تغيير: "+(e?.message||String(e)),false);setCloudStatus("Sync Error",false)}
  },700);
}
function showApp(){$("authGate")?.classList.add("hidden");$("appShell")?.classList.remove("locked");renderAll();go("dashboard")}
function showAuth(){$("authGate")?.classList.remove("hidden");$("appShell")?.classList.add("locked")}
function unlockApp(){
  const value=$("authPassword")?.value||"";
  if(value===FIXED_PASSWORD){localStorage.setItem("hashem_life_os_unlocked","1");showApp();$("authMessage").textContent=""}
  else authMessage("الرقم السري غير صحيح.");
}
async function connectDatabase(){
  try{
    const enteredKey=$("cloudKey")?.value?.trim();
    if(!enteredKey)throw new Error("أدخل Publishable Key أولًا.");

    saveCloudKey(enteredKey);
    supabaseClient=null;
    cloudUser=null;

    // Step 1: verify that the browser can actually reach the Supabase Auth API.
    let response;
    try{
      response=await fetch(SUPABASE_URL+"/auth/v1/settings",{
        method:"GET",
        headers:{apikey:enteredKey}
      });
    }catch(e){
      throw new Error("المتصفح لا يستطيع الوصول إلى Supabase Auth. افحص الاتصال بالإنترنت، AdBlock/Privacy extensions، أو حالة مشروع Supabase. التفاصيل: "+(e?.message||String(e)));
    }

    if(!response.ok){
      let body="";
      try{body=await response.text()}catch{}
      if(response.status===401||response.status===403){
        throw new Error("Publishable Key غير صالح أو غير صحيح لهذا المشروع. تأكد أنك نسخت المفتاح من Supabase → Settings → API Keys.");
      }
      throw new Error("Supabase Auth أعاد HTTP "+response.status+(body?" — "+body.slice(0,180):""));
    }

    // Step 2: create/restore the anonymous authenticated session.
    let session;
    try{
      session=await ensureCloudSession();
    }catch(e){
      const msg=e?.message||String(e);
      if(/anonymous|sign.?in|signup|not enabled|disabled/i.test(msg)){
        throw new Error("الاتصال بـSupabase يعمل، لكن Anonymous Sign-Ins غير مفعّلة في المشروع. فعّلها من Supabase → Authentication → Providers/Sign In → Anonymous Sign-Ins.");
      }
      throw new Error("اتصال Supabase نجح، لكن إنشاء Anonymous Session فشل: "+msg);
    }

    // Step 3: read/write the user's Cloud row.
    try{
      await afterAuth(session.user);
    }catch(e){
      throw new Error("تم إنشاء Cloud Session بنجاح، لكن الوصول إلى جدول user_dashboard_data فشل: "+(e?.message||String(e))+" — تأكد من تشغيل supabase.sql ومن RLS/Data API.");
    }

    setCloudStatus("Cloud Connected",true);
    cloudMessage("تم ربط Supabase ومزامنة بياناتك ✓",true);
    return true;
  }catch(e){
    console.error("Cloud connection error:",e);
    cloudUser=null;
    setCloudStatus("Cloud Error",false);
    cloudMessage(e?.message||String(e),false);
    return false;
  }
}
async function syncDatabase(){
  try{
    if(!supabaseClient||!cloudUser){const ok=await connectDatabase();if(!ok)return}
    else await pushDatabase(true);
  }catch(e){cloudMessage(e?.message||String(e),false);setCloudStatus("Sync Error",false)}
}
async function signOut(){
  if(!supabaseClient){try{initSupabase()}catch{}}
  if(!supabaseClient){setCloudStatus("Local",false);return}
  if(!confirm("فصل جلسة Cloud سيمنعك من استعادة نفس Anonymous Session لاحقًا. هل تريد المتابعة؟"))return;
  try{await supabaseClient.auth.signOut()}catch{}
  cloudUser=null;
  setCloudStatus("Local",false);
  if($("accountStatus"))$("accountStatus").textContent="غير متصل — Local فقط";
  if($("userAccountStatus"))$("userAccountStatus").textContent="Local Mode";
  cloudMessage("تم فصل جلسة Cloud. بياناتك المحلية بقيت كما هي.",true);
}

document.querySelectorAll(".nav").forEach(x=>x.onclick=()=>go(x.dataset.page));
$("menuBtn").onclick=()=>document.querySelector(".sidebar").classList.toggle("open");
// Authentication is handled by the single fixed-password gate below.
$("signOut").onclick=signOut;
$("saveHealth").onclick=saveHealth;
$("connectDatabase").onclick=connectDatabase;
$("syncDatabase").onclick=syncDatabase;

async function start(){
  // Bind the login controls first so a rendering error cannot disable login.
  const submit=$("authSubmit"), password=$("authPassword");
  if(submit) submit.onclick=unlockApp;
  const healthButton=$("saveHealth"); if(healthButton) healthButton.onclick=saveHealth;
  if(password) password.onkeydown=e=>{if(e.key==="Enter")unlockApp()};
  try{
    renderAll();
  }catch(e){
    console.error("Dashboard render error:",e);
  }
  const unlocked=localStorage.getItem("hashem_life_os_unlocked")==="1";
  if(unlocked) showApp(); else showAuth();
}
start();