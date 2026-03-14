(function(c,o,f){"use strict";const m={pjs:"pis",ya:"ta",rs:"ra",tm:"mt",ois:"pis",ojs:"pis",sma:`sa
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
si`,na:"ma",caca:"cac",piw:"pis",fr:"ft",ns:"ma",oia:"pis"},u=Object.keys(m).sort(function(a,t){return t.length-a.length}),l=u.map(function(a){return a.toLowerCase()});function d(a){const t=a.toLowerCase();return l.some(function(s){return s.includes(" ")&&s.startsWith(t+" ")})}function h(a){if(!a)return null;const t=a.toLowerCase();if(a===a.toUpperCase()&&/[A-Z]/.test(a))return null;for(const s of u)if(t===s.toLowerCase())return m[s];return null}function g(a,t){const s=a.split(`
`),e=s[s.length-1].split(" ");for(let n=Math.min(3,e.length);n>=1;n--){const p=e.slice(e.length-n).join(" "),i=h(p);if(i!==null){if(t&&d(p))continue;return{phrase:p,corrected:i}}}return null}const r=[];var j={onLoad(){try{const a=f.findByProps("onChange","onChangeText");if(!a)return;r.push(o.after("onChangeText",a,function([s],e){return e}));const t=(global.vendetta?.metro?.common?.ReactNative??require("react-native"))?.TextInput;if(!t||!(t.prototype?.render??t.render))return;r.push(o.after("render",t.prototype??t,function(s,e){if(!e?.props)return e;const n=e.props.onChangeText;return n&&(e.props.onChangeText=function(p){const i=g(p,!0);if(i){const{phrase:w,corrected:v}=i,C=p.slice(0,p.length-w.length)+v;n(C);return}n(p)}),e}))}catch(a){console.error("[AutoCorrect] onLoad error:",a)}},onUnload(){r.forEach(function(a){return a?.()}),r.length=0}};return c.default=j,Object.defineProperty(c,"__esModule",{value:!0}),c})({},vendetta.patcher,vendetta.metro);
