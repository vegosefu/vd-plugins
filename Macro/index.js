(function(M,i,E,l,y){"use strict";l.storage.messages??=[],l.storage.running??=!1;const j={pjs:"pis",ya:"ta",rs:"ra",tm:"mt",ois:"pis",ojs:"pis",sma:`sa
ma`,sama:`sa
ma`,petn:`pe
tn`,pks:"pis",oks:"pis",mr:"mt",ri:"ti",spe:`si
pe`,tj:"tn",ea:"ra",cape:`cac
pe`,iah:"iau",di:"si",fuy:"fut",vac:"cac",vav:"cac",sata:`sa
ta`,sta:`sa
ta`,tasa:`ta
sa`,lis:"pis",ms:"ma",mari:`ma
ti`,pja:"pis",pipe:`pis
pe`,puspe:`pis
pe`,ous:"pis",rn:"tn",dw:"de",cax:"cac",xac:"cac",aa:"sa",pus:"pis",xax:"cac",ran:"fan",dan:"fan",oau:"pis",us:"pis",oe:"pe",marj:`ma
ti`,gi:"ti",ds:"ra",rj:"ti",rssa:`ra
sa`,essa:`ra
sa`,rada:`ra
sa`,"ma cac":`ma
cac`,"ma pis":`ma
pis`,maa:"ma",saa:"sa",fn:"tn",pispe:`pis
pe`,cacpe:`cac
pe`,pw:"pe",le:"pe",tb:"tn",da:"ra",mpis:`ma
pis`,za:"sa",so:"si",can:"fan",sipe:`si
pe`,macac:`ma
cac`,mapis:`ma
pis`,fug:"fut",sk:"si",ljs:"pis",pmr:`pe
mt`,"pe mr":`pe
mt`,pemt:`pe
mt`,"pe mt":`pe
mt`,"pe tn":`pe
tn`,pr:"pe",per:`pe
ra`,pera:`pe
ra`,peta:`pe
ra`,sti:"ti",tsi:`tn
si`,raa:"ra",tide:`ti
de`,rm:"tn",st:`sa
ta`,mlis:`ma
pis`,pos:"pis",pospe:`pis
pe`,pope:`pis
pe`,is:"pis",tr:"te",acc:"cac",peea:`pe
ra`,sile:`si
pe`,sle:`si
pe`,dut:"fut",pmt:`pe
mt`,fanan:"fan",fanam:"fan",pms:"pis",va:"ca",fana:"fan",taasa:`ta
sa`,mam:"ma",taza:`ta
sa`,os:"si",tos:"tn",pia:"pis",lia:"pis",gj:"gu",gra:`gu
ra`,lw:"pe",tk:"ti",sj:"si",cqc:"cac",poa:"pis",nt:"mt",saya:`sa
ta`,mw:"ma",rk:"ti",taa:"ta",cale:`cac
pe`,mpjs:`ma
pis`,mai:`mt
si`,pipw:`pis
pe`,tw:"ta","ama cac":`ama
cac`,oispe:`pis
pe`,"pw tn":`pe
tn`,pwtn:`pe
tn`,"pw mt":`pe
mt`,pwmt:`pe
mt`,mljs:`ma
pis`,ow:"pe","si pe":`si
pe`,maacc:`ma
cac`,ai:"si",th:"tn",ohs:"pis",mpia:`ma
pis`,acpe:`cac
pe`,accpe:`cac
pe`,vape:`cac
pe`,taaa:`ta
sa`,letj:`pe
tn`,cc:"cac",pjpe:`pis
pe`,"pe nr":`pe
tn`,penr:`pe
tn`,acca:"cac",nr:"mt",me:"ma",pern:`pe
tn`,petj:`pe
tn`,pns:"pis",caep:`cac
pe`,mcac:`ma
cac`,sioe:`si
pe`,tnsi:`tn
si`,na:"ma",caca:"cac",piw:"pis",fr:"ft",ns:"ma",oia:"pis"},x=Object.keys(j).sort(function(t,e){return e.length-t.length}),z=x.map(function(t){return t.toLowerCase()}),P=x.filter(function(t){return t.includes(`
`)});function U(t){const e=t.toLowerCase();return z.some(function(a){return a.includes(" ")&&a.startsWith(e+" ")})}function F(t){if(!t)return null;const e=t.toLowerCase();if(t===t.toUpperCase()&&/[A-Z]/.test(t))return null;for(const a of x)if(e===a.toLowerCase())return j[a];return null}function A(t,e){for(const r of P)if(t.slice(-r.length).toLowerCase()===r.toLowerCase()){const n=t.slice(-r.length);if(n===n.toUpperCase()&&/[A-Z]/.test(n))continue;return{phrase:r,corrected:j[r],crossLine:!0,matchLen:r.length}}const a=t.split(`
`),s=a[a.length-1].split(" ");for(let r=Math.min(3,s.length);r>=1;r--){const n=s.slice(s.length-r).join(" "),p=F(n);if(p!==null){if(e&&U(n))continue;return{phrase:n,corrected:p,crossLine:!1}}}return null}let f=!1,w=!1,o=[],T=0,L=!0;const C=new Set,v="aeiourstmn";function I(t){if(!t||!t.trim())return[];const e=t.split(`
`),a=[];let s=[];for(const r of e)r.trim()===""&&s.length>0?(a.push(s.join(`
`)),s=[]):r.trim()!==""&&s.push(r);return s.length>0&&a.push(s.join(`
`)),a}function R(){o=(l.storage.messages??[]).map(function(t,e){return e});for(let t=o.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));[o[t],o[e]]=[o[e],o[t]]}T=0}function G(){const t=l.storage.messages??[];return o.length===0&&R(),T>=o.length&&R(),t[o[T++]]}function O(t){const e=t.trim();if(!C.has(e))return C.add(e),t;const a=t.split(`
`),s=a.map(function(u,d){return{l:u.trim(),i:d}}).filter(function(u){return u.l.length>=2});if(s.length===0)return t;const r=s[Math.floor(Math.random()*s.length)],n=r.l,p=Math.floor(Math.random()*(n.length+1)),h=v[Math.floor(Math.random()*v.length)],b=n.slice(0,p)+h+n.slice(p),g=[...a];return g[r.i]=b,g.join(`
`)}function W(){try{return E.findByProps("getChannelId","getVoiceChannelId")?.getChannelId?.()??null}catch{return null}}function N(t){try{const e=E.findByProps("sendMessage","_sendMessage"),a=W();if(!a||!e)return;e.sendMessage(a,{content:t})}catch(e){console.error("[Macro] sendMessage error:",e)}}function V(t){return new Promise(function(e){return setTimeout(e,t)})}async function _(){if((l.storage.messages??[]).length===0){f=!1,y.showToast("Nu ai mesaje \xEEnc\u0103rcate!",{key:"warning"});return}for(R();f&&!w;){const t=O(G());N(t);const e=Math.floor(Math.random()*2e3)+1500;await V(e)}f=!1}const{ScrollView:Z,View:B,Text:m,TextInput:$,TouchableOpacity:k,StyleSheet:q}=i.ReactNative,c=q.create({container:{flex:1,backgroundColor:"#1e1f22",padding:12},title:{color:"#fff",fontSize:20,fontWeight:"bold",marginBottom:12},status:{color:"#b5bac1",fontSize:13,marginBottom:12},statusRunning:{color:"#57f287"},row:{flexDirection:"row",gap:8,marginBottom:10},btn:{flex:1,borderRadius:8,padding:12,alignItems:"center"},btnGreen:{backgroundColor:"#2d7d46"},btnRed:{backgroundColor:"#da373c"},btnBlue:{backgroundColor:"#5865f2"},btnGray:{backgroundColor:"#4e4f58"},btnText:{color:"#fff",fontWeight:"bold",fontSize:14},input:{backgroundColor:"#2b2d31",color:"#dcddde",borderRadius:8,padding:10,marginBottom:8,fontSize:14},sectionTitle:{color:"#b5bac1",fontSize:13,marginBottom:6,marginTop:8},msgCount:{color:"#57f287",fontSize:13,marginBottom:8},output:{backgroundColor:"#111214",borderRadius:8,padding:10,marginTop:8,minHeight:40},outputText:{color:"#57f287",fontFamily:"monospace",fontSize:12}});function D(){const[t,e]=i.React.useState(f),[a,s]=i.React.useState(""),[r,n]=i.React.useState(""),p=l.storage.messages?.length??0;function h(){f?(w=!0,f=!1,e(!1),y.showToast("Macro oprit",{key:"info"})):(w=!1,f=!0,L=!1,e(!0),y.showToast("Macro pornit",{key:"success"}),_().then(function(){return e(!1)}))}function b(){if(!a.trim().startsWith("http")){n("\u274C URL invalid");return}fetch(a.trim()).then(function(u){return u.text()}).then(function(u){const d=I(u);if(d.length===0){n("\u274C Nu s-au g\u0103sit mesaje");return}l.storage.messages=d,C.clear(),R(),n(`\u2713 ${d.length} mesaje \xEEnc\u0103rcate`),y.showToast(`${d.length} mesaje \xEEnc\u0103rcate!`,{key:"success"})}).catch(function(){return n("\u274C Eroare la fetch URL")})}function g(){l.storage.messages=[],C.clear(),o=[],n("\u2713 Mesaje \u0219terse")}return i.React.createElement(Z,{style:c.container,keyboardShouldPersistTaps:"handled"},i.React.createElement(m,{style:c.title},"\u26A1 Macro + AutoCorrect"),i.React.createElement(m,{style:[c.status,t&&c.statusRunning]},"Status: ",t?"\u{1F7E2} Pornit":"\u{1F534} Oprit"),i.React.createElement(m,{style:c.msgCount},"Mesaje \xEEnc\u0103rcate: ",p),i.React.createElement(k,{style:[c.btn,t?c.btnRed:c.btnGreen,{marginBottom:10}],onPress:h},i.React.createElement(m,{style:c.btnText},t?"\u23F9 Stop Macro":"\u25B6 Start Macro")),i.React.createElement(m,{style:c.sectionTitle},"\xCEncarc\u0103 mesaje din URL"),i.React.createElement($,{style:c.input,placeholder:"https://raw.githubusercontent.com/...",placeholderTextColor:"#6d6f78",value:a,onChangeText:s,autoCapitalize:"none",autoCorrect:!1}),i.React.createElement(B,{style:c.row},i.React.createElement(k,{style:[c.btn,c.btnBlue],onPress:b},i.React.createElement(m,{style:c.btnText},"\u{1F310} Load URL")),i.React.createElement(k,{style:[c.btn,c.btnGray],onPress:g},i.React.createElement(m,{style:c.btnText},"\u{1F5D1} Clear"))),r!==""&&i.React.createElement(B,{style:c.output},i.React.createElement(m,{style:c.outputText},r)))}const S=[];function H(){try{const t=E.findByProps("sendMessage","editMessage");if(!t)return;S.push(function(){const e=t.sendMessage.bind(t);return t.sendMessage=function(a,s,...r){if(L&&s?.content){let n=s.content;const p=A(n,!1);if(p){const{phrase:h,corrected:b,crossLine:g,matchLen:u}=p,d=g?u:h.length;n=n.slice(0,n.length-d)+b,s={...s,content:n}}}return e(a,s,...r)},function(){t.sendMessage=e}}())}catch(t){console.error("[AutoCorrect] patch error:",t)}}var K={settings:D,onLoad(){H()},onUnload(){f=!1,w=!0,S.forEach(function(t){return t?.()}),S.length=0}};return M.default=K,Object.defineProperty(M,"__esModule",{value:!0}),M})({},vendetta.metro.common,vendetta.metro,vendetta.plugin,vendetta.ui.toasts);
