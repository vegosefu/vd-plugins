(function(r,o,m,d){"use strict";const{TextInput:u}=d.ReactNative,f={pjs:"pis",ya:"ta",rs:"ra",tm:"mt",ois:"pis",ojs:"pis",sma:`sa
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
si`,na:"ma",caca:"cac",piw:"pis",fr:"ft",ns:"ma",oia:"pis"},l=Object.keys(f).sort(function(a,t){return t.length-a.length}),h=l.map(function(a){return a.toLowerCase()});function v(a){const t=a.toLowerCase();return h.some(function(s){return s.includes(" ")&&s.startsWith(t+" ")})}function g(a){if(!a)return null;const t=a.toLowerCase();if(a===a.toUpperCase()&&/[A-Z]/.test(a))return null;for(const s of l)if(t===s.toLowerCase())return f[s];return null}function j(a,t){const s=a.split(`
`),p=s[s.length-1].split(" ");for(let e=Math.min(3,p.length);e>=1;e--){const i=p.slice(p.length-e).join(" "),n=g(i);if(n!==null){if(t&&v(i))continue;return{phrase:i,corrected:n}}}return null}function w(a,t=""){const s=j(a,t==="");if(!s)return null;const{phrase:p,corrected:e}=s;return a.slice(0,a.length-p.length)+e+t}const c=[];var y={onLoad(){try{c.push(o.after("render",u.prototype??u,function(a,t){if(!t?.props)return t;const s=t.props.onChange,p=t.props.onKeyPress;return t.props.onChange=function(e){const i=e?.nativeEvent?.text??e?.target?.value??"",n=w(i,"");n!==null&&n!==i&&(e={...e,nativeEvent:{...e.nativeEvent,text:n}},e.target&&(e.target.value=n)),s?.(e)},t.props.onKeyPress=function(e){p?.(e)},t}))}catch{}try{const a=m.findByName("ChatInput",!1)??m.findByProps("insertText");a&&c.push(o.after("insertText",a,function([t],s){return s}))}catch{}},onUnload(){c.forEach(function(a){return a()}),c.length=0}};return r.default=y,Object.defineProperty(r,"__esModule",{value:!0}),r})({},vendetta.patcher,vendetta.metro,vendetta.metro.common);
