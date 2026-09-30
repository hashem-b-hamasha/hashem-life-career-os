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
 summary:"خريج Software Engineering من Jordan University of Science and Technology (JUST)، يبني أساسًا عمليًا قويًا في البرمجة وحل المشكلات وOOP وData Structures وDatabases وSoftware Architecture، مع خبرة مشاريع باستخدام C# وJava وJavaScript/TypeScript وReact/Next.js وSQL.",
 education:["Bachelor of Software Engineering — Jordan University of Science and Technology (JUST) — 2026"],
 skills:["C#","JavaScript","TypeScript","C++","Java","Python","HTML","CSS","React","Next.js","ASP.NET MVC","ASP.NET Core","Entity Framework","REST APIs","SQL Server","PostgreSQL","MySQL","Prisma","Git","GitHub","Tailwind CSS","OOP","Data Structures","Algorithms","SOLID","UML","Software Architecture"],
 projects:[
   ["Job Application Tracker","CRUD + APIs + database + testing + deployment"],
   ["Customer Management","Next.js 16 + TypeScript + Prisma + PostgreSQL/Supabase"],
   ["TREAQ","C# + ASP.NET MVC + Entity Framework + SQL Server"],
   ["Campus Event System","Java Servlets + JSP + MySQL + MVC"],
   ["Portfolio","React + TypeScript + Tailwind"],
   ["PLUGIX","Next.js + TypeScript + Prisma + Auth + Admin + Store + Orders"],
   ["Qareen","Next.js 16 + TypeScript + Prisma + PostgreSQL"]
 ],
 certs:["Cisco CCNA: Introduction to Networks","Cisco Industrial Cybersecurity Essentials","Introduction to Modern AI","HTML5 Essentials","Meta Full Stack Developer — Coursera (in progress / completed modules)"]
};

function renderAll(){renderDashboard();renderPlan();renderEnglish();renderSoftware();renderProjects();renderSpecialization();renderCareer();renderReports();loadSettings();renderDaily();renderHealth()}
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
  $("cvName").textContent=cvData.summary?state.profile.name:"Hashem Hamasha";
  $("cvHeadline").textContent="Software Engineering Graduate · Junior Software Engineer";
  $("cvSummary").textContent=cvData.summary;
  $("cvEducation").innerHTML=cvData.education.map(x=>"<p>"+escapeHtml(x)+"</p>").join("");
  $("cvSkills").innerHTML=cvData.skills.map(x=>"<span class='tag'>"+escapeHtml(x)+"</span>").join("");
  $("cvProjects").innerHTML=cvData.projects.map(x=>"<div><b>"+escapeHtml(x[0])+"</b><span>"+escapeHtml(x[1])+"</span></div>").join("");
  $("cvCerts").innerHTML=cvData.certs.map(x=>"<div><b>"+escapeHtml(x)+"</b></div>").join("");
}
function renderLearningMethod(){
  const el=$("learningMethod");
  if(!el)return;
  el.innerHTML='<div class="learning-flow"><b>Learn</b><span>افهم المفهوم</span><b>Practice</b><span>طبّق</span><b>Build</b><span>اربطه بمشروع</span><b>Explain</b><span>اشرحه بصوتك</span><b>Review</b><span>راجع أخطاءك</span></div><ul>'+state.learning.rules.map(x=>"<li>"+escapeHtml(x)+"</li>").join("")+"</ul>";
}
{$("careerItems").innerHTML=careerItems.map(x=>`<label class="career-item"><div><b>${x}</b><span>${state.career[x]?'Completed':'Not completed'}</span></div><input data-career="${x}" type="checkbox" ${state.career[x]?'checked':''}></label>`).join("");document.querySelectorAll("[data-career]").forEach(x=>x.onchange=e=>{state.career[e.target.dataset.career]=e.target.checked;persist()})}

function renderHealth(){let d=state.health[selectedDate]||{};$("healthWeight").value=d.weight||"";$("healthSleep").value=d.sleep||"";$("healthWorkout").checked=!!d.workout;$("healthWater").checked=!!d.water;let vals=Object.values(state.health);$("lastWeight").textContent=vals.length?vals[vals.length-1].weight+" kg":"—";let sleeps=vals.filter(x=>x.sleep).map(x=>+x.sleep);$("avgSleep").textContent=sleeps.length?(sleeps.reduce((a,b)=>a+b,0)/sleeps.length).toFixed(1)+"h":"—";$("workoutDays").textContent=vals.filter(x=>x.workout).length}
$("saveHealth").onclick=()=>{state.health[selectedDate]={weight:$("healthWeight").value,sleep:$("healthSleep").value,workout:$("healthWorkout").checked,water:$("healthWater").checked};persist();renderHealth()}

function renderReports(){let entries=Object.entries(state.days),hours=entries.reduce((s,[,d])=>s+Object.values(d.hours).reduce((a,b)=>a+b,0),0);let avg=entries.length?hours/entries.length:0;$("reportMetrics").innerHTML=[["Days Logged",entries.length],["Total Hours",hours.toFixed(1)+"h"],["Average / Day",avg.toFixed(1)+"h"],["8h Days",entries.filter(([,d])=>Object.values(d.hours).reduce((a,b)=>a+b,0)>=8).length]].map(x=>`<div class="metric"><span>${x[0]}</span><b>${x[1]}</b></div>`).join("");let rows=[];for(let i=6;i>=0;i--){let date=addDays(today(),-i),d=state.days[date],h=d?Object.values(d.hours).reduce((a,b)=>a+b,0):0;rows.push(`<div class="hour-row"><span>${date}</span><div class="bar"><i style="width:${Math.min(100,h/8*100)}%"></i></div><b>${h}h</b></div>`)}$("weeklyBars").innerHTML=rows.join("");let r=state.reviews[weekKey()]||{};$("reviewWin").value=r.win||"";$("reviewBlock").value=r.block||"";$("reviewNext").value=r.next||""}
function weekKey(){let d=new Date(),one=new Date(d.getFullYear(),0,1);return "w"+Math.ceil((((d-one)/86400000)+one.getDay()+1)/7)}
$("saveReview").onclick=()=>{state.reviews[weekKey()]={win:$("reviewWin").value,block:$("reviewBlock").value,next:$("reviewNext").value};persist();renderReports()}

function loadSettings(){$("startDate").value=state.settings.start;$("endDate").value=state.settings.end}
$("saveSettings").onclick=()=>{state.settings.start=$("startDate").value;state.settings.end=$("endDate").value;persist();alert("تم حفظ الفترة")}
function exportData(){let blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="hashem-life-os-backup-"+today()+".json";a.click()}
$("exportData").onclick=exportData;
$("importData").onchange=e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=()=>{try{state=JSON.parse(r.result);persist();alert("تم استرجاع النسخة")}catch{alert("الملف غير صالح")}};r.readAsText(f)}
$("resetData").onclick=()=>{if(confirm("حذف البيانات المحلية؟ احتفظ بنسخة Export أولًا.")){localStorage.removeItem(LS);location.reload()}}



const CLOUD_CFG="hashem_supabase_cloud_v2";
const SUPABASE_URL="https://lepffckwdmrcckxnnfdx.supabase.co";
let supabaseClient=null, cloudUser=null, cloudTimer=null, pendingPhone=null, pendingPassword=null;

function setCloudStatus(label,ok){const el=$("cloudStatus");if(el){el.textContent=label;el.className="badge "+(ok?"good":"")}}
function cloudMessage(msg,good){const el=$("cloudMessage");if(el){el.textContent=msg;el.style.color=good?"#237a42":"#b42318"}}
function authMessage(msg,good=false){const el=$("authMessage");if(el){el.textContent=msg;el.style.color=good?"#237a42":"#b42318"}}
function saveCloudKey(key){if(key)localStorage.setItem(CLOUD_CFG,JSON.stringify({url:SUPABASE_URL,key:key}))}
function loadCloudConfig(){let cfg=JSON.parse(localStorage.getItem(CLOUD_CFG)||"null");if(!cfg?.key){const old=JSON.parse(localStorage.getItem("hashem_supabase_cloud_v1")||localStorage.getItem("hashem_supabase_config_v1")||"null");if(old?.key){cfg={url:SUPABASE_URL,key:old.key};saveCloudKey(old.key)}}if(cfg?.key){if($("cloudKey"))$("cloudKey").value=cfg.key;if($("authCloudKey"))$("authCloudKey").value=cfg.key}return cfg}
function initSupabase(){if(!window.supabase?.createClient)throw new Error("Supabase SDK لم تُحمّل. حدّث الصفحة.");const cfg=loadCloudConfig();if(!cfg?.key)throw new Error("أدخل Publishable Key أولًا.");supabaseClient=window.supabase.createClient(SUPABASE_URL,cfg.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});return supabaseClient}
function showApp(){ $("authGate")?.classList.add("hidden");$("appShell")?.classList.remove("locked");renderAll();go("dashboard");}
function showAuth(){ $("authGate")?.classList.remove("hidden");$("appShell")?.classList.add("locked");}
function normalizePhone(v){let p=String(v||"").trim().replace(/[\s()-]/g,"");if(!p.startsWith("+"))p="+"+p;return p}
function setAuthMode(mode){window.authMode=mode;const login=mode==="login";$("loginTab").classList.toggle("active",login);$("signupTab").classList.toggle("active",!login);$("authPassword2").style.display=login?"none":"block";$("authSubmit").textContent=login?"دخول":"إنشاء الحساب";$("authPassword").autocomplete=login?"current-password":"new-password";authMessage("")}
async function pushDatabase(silent){
  if(!supabaseClient||!cloudUser){if(!silent)cloudMessage("لا يوجد حساب متصل.",false);return}
  const result=await supabaseClient.from("user_dashboard_data").upsert({user_id:cloudUser.id,payload:state,updated_at:new Date().toISOString()},{onConflict:"user_id"});
  if(result.error)throw result.error;
  if(!silent)cloudMessage("تمت المزامنة ✓",true);
}
async function pullDatabase(){
  if(!supabaseClient||!cloudUser)return;
  const result=await supabaseClient.from("user_dashboard_data").select("payload").eq("user_id",cloudUser.id).maybeSingle();
  if(result.error)throw result.error;
  if(result.data?.payload){state=mergeDeep(defaultState(),result.data.payload);localStorage.setItem(LS,JSON.stringify(state));renderAll();cloudMessage("تم جلب بيانات حسابك ✓",true)}
  else{await pushDatabase(true);cloudMessage("تم إنشاء مساحة بيانات حسابك ✓",true)}
}
function scheduleCloudSync(){if(!supabaseClient||!cloudUser)return;clearTimeout(cloudTimer);cloudTimer=setTimeout(()=>pushDatabase(true).catch(e=>console.warn("Cloud sync:",e)),900)}
async function afterAuth(user){
  cloudUser=user;
  showApp();
  try{await pullDatabase()}catch(e){setCloudStatus("Cloud Error",false);console.warn(e)}
  if($("accountStatus"))$("accountStatus").textContent=user?.phone?"متصل: "+user.phone:"حساب متصل";
}
async function submitAuth(){
  try{
    initSupabase();
    const phone=normalizePhone($("authPhone").value),password=$("authPassword").value;
    if(!/^\+[1-9]\d{7,14}$/.test(phone))throw new Error("اكتب رقم الهاتف بصيغة دولية مثل +9627xxxxxxxx.");
    if(password.length<8)throw new Error("كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
    if(window.authMode==="signup"){
      if(password!==$("authPassword2").value)throw new Error("تأكيد كلمة المرور غير مطابق.");
      const {data,error}=await supabaseClient.auth.signUp({phone,password});
      if(error)throw error;
      pendingPhone=phone;pendingPassword=password;
      if(data.session){cloudUser=data.user;await pushDatabase(true);authMessage("تم إنشاء الحساب وحفظ بياناتك ✓",true);await afterAuth(data.user)}
      else{$("otpBox").style.display="block";authMessage("تم إرسال رمز التحقق إلى هاتفك. أدخل الـOTP.",true)}
    }else{
      const {data,error}=await supabaseClient.auth.signInWithPassword({phone,password});
      if(error)throw error;
      await afterAuth(data.user);
    }
  }catch(e){authMessage(e?.message||String(e),false)}
}
async function verifyPhoneOtp(){
  try{
    initSupabase();
    const phone=pendingPhone||normalizePhone($("authPhone").value),token=$("authOtp").value.trim();
    if(!/^\d{6}$/.test(token))throw new Error("أدخل رمزًا من 6 أرقام.");
    const {data,error}=await supabaseClient.auth.verifyOtp({phone,token,type:"sms"});
    if(error)throw error;
    if(data.session?.user){cloudUser=data.session.user;await pushDatabase(true);$("otpBox").style.display="none";await afterAuth(data.session.user);authMessage("تم تأكيد الرقم والدخول ✓",true)}
  }catch(e){authMessage(e?.message||String(e),false)}
}
async function signOut(){
  if(!supabaseClient)try{initSupabase()}catch{}
  if(supabaseClient)await supabaseClient.auth.signOut();
  cloudUser=null;showAuth();authMessage("تم تسجيل الخروج.");setCloudStatus("Local",false)
}
async function connectDatabase(){
  try{
    initSupabase();
    const session=(await supabaseClient.auth.getSession()).data.session;
    if(!session){setCloudStatus("Login Required",false);cloudMessage("سجّل الدخول من شاشة الحساب أولًا.",false);showAuth();return false}
    await afterAuth(session.user);setCloudStatus("Cloud Connected",true);cloudMessage("تم الاتصال ✓",true);return true;
  }catch(e){setCloudStatus("Cloud Error",false);cloudMessage(e?.message||String(e),false);return false}
}
async function syncDatabase(){try{if(!supabaseClient||!cloudUser){const ok=await connectDatabase();if(!ok)return}else await pushDatabase(false)}catch(e){cloudMessage(e?.message||String(e),false)}}

document.querySelectorAll(".nav").forEach(x=>x.onclick=()=>go(x.dataset.page));
$("menuBtn").onclick=()=>document.querySelector(".sidebar").classList.toggle("open");
$("loginTab").onclick=()=>setAuthMode("login");
$("signupTab").onclick=()=>setAuthMode("signup");
$("authSubmit").onclick=submitAuth;
$("verifyOtp").onclick=verifyPhoneOtp;
$("signOut").onclick=signOut;

async function start(){
  renderAll();loadCloudConfig();setAuthMode("login");
  try{
    initSupabase();
    const session=(await supabaseClient.auth.getSession()).data.session;
    if(session?.user){await afterAuth(session.user);setCloudStatus("Cloud Connected",true)}
    else showAuth();
    supabaseClient.auth.onAuthStateChange(async(_event,session)=>{if(session?.user){cloudUser=session.user;showApp()}else{cloudUser=null;showAuth()}});
  }catch(e){showAuth();authMessage("قبل الدخول: أدخل Publishable Key من Supabase.");console.warn(e)}
}
start();