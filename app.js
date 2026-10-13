(function(){
var WA='13523549663';
var D=window.GW_DATA, L=D.listings, $=function(i){return document.getElementById(i)};
var ZONAS=['Santo Domingo','Cap Cana','Bávaro','Jarabacoa','Juan Dolio'];
var CHIPS=['piscina','piscina_priv','jacuzzi','picuzzi','hidro_priv','playa','rio','vista_mar','vista_montana','mascotas','gym','bbq'];
function ls(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var NL=(navigator.language||'es').slice(0,2), lang=ls('gw_lang',['es','en','fr'].indexOf(NL)>=0?NL:'en'), cur$=ls('gw_cur','USD');
var lists=ls('gw_lists',{}), cart=ls('gw_cart',[]), chips=[], showNA=false, verLista='', vista='lista';
var TX={
es:{nivel:'nivel',niveles:'niveles',tipoF:'Tipo',todos:'Todos',piso:'Piso',pb:'Planta baja',h1a:'Tu estadía en ',h1b:'República Dominicana',sub:'Apartamentos, villas y cabañas en Santo Domingo, Cap Cana, Bávaro, Jarabacoa y Juan Dolio. Mira la disponibilidad real, cotiza al instante y reserva.',
zona:'Ubicación',todas:'Todas',ci:'Llegada',co:'Salida',hue:'Huéspedes',cuantos:'¿Cuántos?',hab:'Habitaciones',ban:'Baños',cualq:'Cualquiera',clr:'Limpiar',
lists:'Mis listas',cot:'Cotización',orden:'Ordenar',rec:'Recomendados',pa:'Precio: menor a mayor',pd:'Precio: mayor a menor',rt:'Mejor valorados',lista:'Lista',mapa:'Mapa',
prop:'propiedad',props:'propiedades',disp:'disponibles del',al:'al',noDispN:'no disponibles en esas fechas',noDisp1:'no disponible en esas fechas',mostrar:'mostrar',quitar:'quitar',enLista:'lista',
desde:'Desde',noche:'noche',noches:'noches',porNoche:'/ noche',total:'total',prom:'promedio por noche, limpieza incluida',elige:'Elige fechas para ver el total',noDispCard:'No disponible en esas fechas',
verRes:'Ver y reservar',verOtras:'Ver otras fechas',verFechas:'Ver fechas y precio',preg:'Preguntar',nuevo:'Nuevo',resenas:'reseñas',
hab1:'hab',cama:'cama',camas:'camas',bano:'baño',banos:'baños',huesp:'huésped',huesps:'huéspedes',hasta:'hasta',extraCargo:'con cargo extra',
elLlegada:'Elige tu fecha de llegada',elSalida:'Ahora elige la salida',borrar:'Borrar fechas',min:'Mínimo',minN:'noches desde esa fecha',
limpieza:'Limpieza',hExtra:'Huéspedes extra',totEst:'Total estimado',nota:'Antes de impuestos y tarifa de servicio de Airbnb. El precio final lo confirma Airbnb.',selFechas:'Selecciona llegada y salida en el calendario. Los días tachados ya están ocupados.',
reservar:'Reservar en Airbnb',agregar:'Agregar a cotización',pregA:'Preguntar en Airbnb',pregW:'Preguntar por WhatsApp',guardar:'♡ Guardar en lista',avisame:'Avísame si se libera',
agregado:'Agregado a tu cotización',guardadoEn:'Guardado en',
askT:'Preguntar',askA:'Por el chat de Airbnb',askW:'Por WhatsApp',askNota:'Si no tienes cuenta de Airbnb, usa WhatsApp.',cancelar:'Cancelar',
lpT:'Guardar en lista',lpN:'Nueva lista (ej. Viaje en familia)',crear:'Crear',listo:'Listo',
listasT:'Mis listas',ver:'Ver',compartir:'Compartir por WhatsApp',borrarL:'Borrar',listasVacio:'Toca ♡ en una propiedad para crear tu primera lista (por ejemplo “Viaje en familia” o “Fin de semana en Jarabacoa”).',
cotT:'Tu cotización',yaNo:'Ya no disponible',reservarA:'Reservar en Airbnb',cotVacio:'Abre una propiedad, elige fechas en su calendario y toca “Agregar a cotización”.',cotNota:'Antes de impuestos y tarifa de servicio de Airbnb.',enviar:'Enviar cotización por WhatsApp',
mdT:'Avísame si se libera',mdP:'Te escribimos si se liberan esas fechas o baja el precio.',nombre:'Tu nombre',correo:'Tu correo',avisarme:'Avisarme',correoMal:'Escribe un correo válido',listoAv:'Listo, te avisaremos a',
own0:'Para propietarios',own1:'¿Tienes un apartamento o villa? Nosotros lo rentamos por ti.',own2:'Administramos tu propiedad en Airbnb de punta a punta y tú recibes tu dinero cada mes con un reporte claro.',ownL1:'Anuncio profesional y precios que se ajustan solos',ownL2:'Atención a huéspedes 24/7 y check-in',ownL3:'Limpieza, mantenimiento y reposiciones',ownL4:'Reporte mensual de ingresos y gastos',own3:'Evaluar mi propiedad →',own5:'o escríbenos por WhatsApp',
upd:'Precios y disponibilidad',tasa:'Precios en pesos aproximados a tasa',vacio:'No hay propiedades con esos filtros.',vacio2:' Prueba otras fechas o quita filtros.',
waRes:'Hola, quiero reservar con Güelcom Stays',waOwn:'Hola, tengo una propiedad y quiero que Güelcom la administre',waAsk:'Hola, tengo una pregunta sobre',del:'del',para:'para',personas:'personas',waCot:'Hola Güelcom, quiero esta cotización:',waLista:'Mira mi lista',waAvisa:'Hola, avísenme a',siLibera:'si se libera',
dias:['D','L','M','M','J','V','S'],meses:['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
am:{rio:'Río a pie',piscina:'Piscina',piscina_priv:'Piscina privada',hidro_priv:'Jacuzzi o picuzzi privado',jacuzzi:'Jacuzzi',picuzzi:'Picuzzi (sin calentar)',playa:'Acceso a playa',vista_mar:'Vista al mar',vista_montana:'Vista a la montaña',mascotas:'Mascotas',parqueo:'Parqueo gratis',lavadora:'Lavadora',gym:'Gimnasio',bbq:'BBQ',cocina:'Cocina',wifi:'Wifi',aire:'Aire acondicionado'},
tipo:{'Apartamento':'Apartamento','Villa':'Villa','Cabaña':'Cabaña','Bungalow':'Bungalow','Casita':'Casita'}},
en:{nivel:'level',niveles:'levels',tipoF:'Type',todos:'All',piso:'Floor',pb:'Ground floor',h1a:'Your stay in ',h1b:'the Dominican Republic',sub:'Apartments, villas and cabins in Santo Domingo, Cap Cana, Bávaro, Jarabacoa and Juan Dolio. See real availability, get an instant quote and book.',
zona:'Location',todas:'All',ci:'Check-in',co:'Check-out',hue:'Guests',cuantos:'How many?',hab:'Bedrooms',ban:'Bathrooms',cualq:'Any',clr:'Clear',
lists:'My lists',cot:'Quote',orden:'Sort',rec:'Recommended',pa:'Price: low to high',pd:'Price: high to low',rt:'Top rated',lista:'List',mapa:'Map',
prop:'property',props:'properties',disp:'available from',al:'to',noDispN:'unavailable on those dates',noDisp1:'unavailable on those dates',mostrar:'show',quitar:'remove',enLista:'list',
desde:'From',noche:'night',noches:'nights',porNoche:'/ night',total:'total',prom:'average per night, cleaning included',elige:'Pick dates to see the total',noDispCard:'Not available on those dates',
verRes:'View & book',verOtras:'See other dates',verFechas:'See dates & price',preg:'Ask',nuevo:'New',resenas:'reviews',
hab1:'bd',cama:'bed',camas:'beds',bano:'bath',banos:'baths',huesp:'guest',huesps:'guests',hasta:'up to',extraCargo:'with extra fee',
elLlegada:'Pick your check-in date',elSalida:'Now pick check-out',borrar:'Clear dates',min:'Minimum',minN:'nights from that date',
limpieza:'Cleaning',hExtra:'Extra guests',totEst:'Estimated total',nota:'Before taxes and Airbnb service fee. Airbnb confirms the final price.',selFechas:'Select check-in and check-out on the calendar. Crossed-out days are booked.',
reservar:'Book on Airbnb',agregar:'Add to quote',pregA:'Ask on Airbnb',pregW:'Ask on WhatsApp',guardar:'♡ Save to list',avisame:'Notify me if it frees up',
agregado:'Added to your quote',guardadoEn:'Saved to',
askT:'Ask a question',askA:'Via Airbnb chat',askW:'Via WhatsApp',askNota:'No Airbnb account? Use WhatsApp.',cancelar:'Cancel',
lpT:'Save to list',lpN:'New list (e.g. Family trip)',crear:'Create',listo:'Done',
listasT:'My lists',ver:'View',compartir:'Share on WhatsApp',borrarL:'Delete',listasVacio:'Tap ♡ on a property to start your first list (e.g. “Family trip” or “Jarabacoa weekend”).',
cotT:'Your quote',yaNo:'No longer available',reservarA:'Book on Airbnb',cotVacio:'Open a property, pick dates on its calendar and tap “Add to quote”.',cotNota:'Before taxes and Airbnb service fee.',enviar:'Send quote on WhatsApp',
mdT:'Notify me if it frees up',mdP:'We will email you if those dates free up or the price drops.',nombre:'Your name',correo:'Your email',avisarme:'Notify me',correoMal:'Enter a valid email',listoAv:'Done, we will notify',
own0:'For owners',own1:'Own an apartment or villa? We rent it for you.',own2:'We manage your property on Airbnb end to end, and you get paid every month with a clear report.',ownL1:'Professional listing and self-adjusting prices',ownL2:'24/7 guest support and check-in',ownL3:'Cleaning, maintenance and restocking',ownL4:'Monthly income and expense report',own3:'Get my property evaluated →',own5:'or message us on WhatsApp',
upd:'Prices & availability',tasa:'DOP prices are approximate at rate',vacio:'No properties match those filters.',vacio2:' Try other dates or remove filters.',
waRes:'Hi, I would like to book with Güelcom Stays',waOwn:'Hi, I own a property and would like Güelcom to manage it',waAsk:'Hi, I have a question about',del:'from',para:'for',personas:'guests',waCot:'Hi Güelcom, I would like this quote:',waLista:'Check out my list',waAvisa:'Hi, please notify',siLibera:'if this frees up:',
dias:['S','M','T','W','T','F','S'],meses:['January','February','March','April','May','June','July','August','September','October','November','December'],
am:{rio:'River within walking distance',piscina:'Pool',piscina_priv:'Private pool',hidro_priv:'Private hot tub or plunge pool',jacuzzi:'Hot tub',picuzzi:'Plunge pool (unheated)',playa:'Beach access',vista_mar:'Ocean view',vista_montana:'Mountain view',mascotas:'Pets allowed',parqueo:'Free parking',lavadora:'Washer',gym:'Gym',bbq:'BBQ',cocina:'Kitchen',wifi:'Wifi',aire:'Air conditioning'},
tipo:{'Apartamento':'Apartment','Villa':'Villa','Cabaña':'Cabin','Bungalow':'Bungalow','Casita':'Cottage'}},
fr:{nivel:'niveau',niveles:'niveaux',tipoF:'Type',todos:'Tous',piso:'Étage',pb:'Rez-de-chaussée',h1a:'Votre séjour en ',h1b:'République dominicaine',sub:'Appartements, villas et chalets à Saint-Domingue, Cap Cana, Bávaro, Jarabacoa et Juan Dolio. Disponibilités en temps réel, devis instantané et réservation.',
zona:'Destination',todas:'Toutes',ci:'Arrivée',co:'Départ',hue:'Voyageurs',cuantos:'Combien ?',hab:'Chambres',ban:'Salles de bain',cualq:'Indifférent',clr:'Effacer',
lists:'Mes listes',cot:'Devis',orden:'Trier',rec:'Recommandés',pa:'Prix croissant',pd:'Prix décroissant',rt:'Mieux notés',lista:'Liste',mapa:'Carte',
prop:'logement',props:'logements',disp:'disponibles du',al:'au',noDispN:'indisponibles à ces dates',noDisp1:'indisponible à ces dates',mostrar:'afficher',quitar:'retirer',enLista:'liste',
desde:'À partir de',noche:'nuit',noches:'nuits',porNoche:'/ nuit',total:'au total',prom:'en moyenne par nuit, ménage inclus',elige:'Choisissez vos dates pour voir le total',noDispCard:'Indisponible à ces dates',
verRes:'Voir et réserver',verOtras:'Voir d’autres dates',verFechas:'Voir dates et prix',preg:'Poser une question',nuevo:'Nouveau',resenas:'avis',
hab1:'ch.',cama:'lit',camas:'lits',bano:'sdb',banos:'sdb',huesp:'voyageur',huesps:'voyageurs',hasta:'jusqu’à',extraCargo:'avec supplément',
elLlegada:'Choisissez votre date d’arrivée',elSalida:'Choisissez maintenant le départ',borrar:'Effacer les dates',min:'Minimum',minN:'nuits à partir de cette date',
limpieza:'Ménage',hExtra:'Voyageurs supplémentaires',totEst:'Total estimé',nota:'Hors taxes et frais de service Airbnb. Airbnb confirme le prix final.',selFechas:'Sélectionnez l’arrivée et le départ dans le calendrier. Les jours barrés sont déjà réservés.',
reservar:'Réserver sur Airbnb',agregar:'Ajouter au devis',pregA:'Demander sur Airbnb',pregW:'Demander sur WhatsApp',guardar:'♡ Enregistrer dans une liste',avisame:'Prévenez-moi si ça se libère',
agregado:'Ajouté à votre devis',guardadoEn:'Enregistré dans',
askT:'Poser une question',askA:'Via la messagerie Airbnb',askW:'Via WhatsApp',askNota:'Pas de compte Airbnb ? Utilisez WhatsApp.',cancelar:'Annuler',
lpT:'Enregistrer dans une liste',lpN:'Nouvelle liste (ex. Voyage en famille)',crear:'Créer',listo:'Terminé',
listasT:'Mes listes',ver:'Voir',compartir:'Partager sur WhatsApp',borrarL:'Supprimer',listasVacio:'Touchez ♡ sur un logement pour créer votre première liste (ex. « Voyage en famille » ou « Week-end à Jarabacoa »).',
cotT:'Votre devis',yaNo:'Plus disponible',reservarA:'Réserver sur Airbnb',cotVacio:'Ouvrez un logement, choisissez vos dates dans son calendrier et touchez « Ajouter au devis ».',cotNota:'Hors taxes et frais de service Airbnb.',enviar:'Envoyer le devis sur WhatsApp',
mdT:'Prévenez-moi si ça se libère',mdP:'Nous vous écrirons si ces dates se libèrent ou si le prix baisse.',nombre:'Votre nom',correo:'Votre e-mail',avisarme:'Me prévenir',correoMal:'Saisissez un e-mail valide',listoAv:'C’est noté, nous préviendrons',
own0:'Propriétaires',own1:'Un appartement ou une villa ? Nous le louons pour vous.',own2:'Nous gérons votre logement sur Airbnb de A à Z et vous êtes payé chaque mois avec un rapport clair.',ownL1:'Annonce professionnelle et prix ajustés automatiquement',ownL2:'Accueil des voyageurs 24h/24 et check-in',ownL3:'Ménage, entretien et réassort',ownL4:'Rapport mensuel des revenus et dépenses',own3:'Faire évaluer mon logement →',own5:'ou écrivez-nous sur WhatsApp',
upd:'Prix et disponibilités',tasa:'Prix en pesos approximatifs au taux',vacio:'Aucun logement ne correspond à ces filtres.',vacio2:' Essayez d’autres dates ou retirez des filtres.',
waRes:'Bonjour, je souhaite réserver avec Güelcom Stays',waOwn:'Bonjour, je suis propriétaire et je souhaite confier mon logement à Güelcom',waAsk:'Bonjour, j’ai une question sur',del:'du',para:'pour',personas:'personnes',waCot:'Bonjour Güelcom, je souhaite ce devis :',waLista:'Voici ma liste',waAvisa:'Bonjour, merci de prévenir',siLibera:'si ce logement se libère :',
dias:['D','L','M','M','J','V','S'],meses:['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'],
am:{rio:'Rivière à pied',piscina:'Piscine',piscina_priv:'Piscine privée',hidro_priv:'Jacuzzi ou bassin privé',jacuzzi:'Jacuzzi',picuzzi:'Bassin non chauffé',playa:'Accès à la plage',vista_mar:'Vue sur la mer',vista_montana:'Vue sur la montagne',mascotas:'Animaux acceptés',parqueo:'Parking gratuit',lavadora:'Lave-linge',gym:'Salle de sport',bbq:'Barbecue',cocina:'Cuisine',wifi:'Wifi',aire:'Climatisation'},
tipo:{'Apartamento':'Appartement','Villa':'Villa','Cabaña':'Chalet','Bungalow':'Bungalow','Casita':'Maisonnette'}}};
function t(k){return TX[lang][k]}
function wa(s){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(s)}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
function money(v){if(cur$==='DOP')return 'RD$'+Math.round(v*D.tasa).toLocaleString('en-US');return 'US$'+Math.round(v).toLocaleString('en-US')}
function fmt(n){return (n%1?String(n).replace('.',lang==='en'?'.':','):String(n))}
function iso(x){return new Date(x).toISOString().slice(0,10)}
function dIdx(s){return Math.round((Date.parse(s)-Date.parse(D.start))/864e5)}
function addD(s,n){return iso(Date.parse(s)+n*864e5)}
function fd(s){var p=s.split('-');return (+p[2])+' '+t('meses')[+p[1]-1].slice(0,3)}
function byId(id){for(var i=0;i<L.length;i++)if(L[i].id===id)return L[i]}
function img(p,w){return /^https?:/.test(p)?p:'https://a0.muscache.com/im/pictures/'+p+'?im_w='+(w||720)}
function photos(x){var a=(x.ph&&x.ph.length)?x.ph.slice():[x.img],c=(D.cover||{})[x.id];if(c&&a[c]){a.unshift(a.splice(c,1)[0])}return a}
function amen(x){var o=(D.ovr||{})[x.id]||{},a=(x.am||[]).concat((D.allAm||[]).filter(function(k){return (x.am||[]).indexOf(k)<0})).filter(function(k){return (o.quitar||[]).indexOf(k)<0});(o.poner||[]).forEach(function(k){if(a.indexOf(k)<0)a.push(k)});return a}
function saved(id){return Object.keys(lists).some(function(n){return lists[n].indexOf(id)>=0})}
function pl(n,a,b){return n+' '+(n===1?a:b)}
function cap(x){return pl(x.huespedes,t('huesp'),t('huesps'))+(x.huespedes_max?' ('+t('hasta')+' '+x.huespedes_max+' '+t('extraCargo')+')':'')}
function specs(x){var p=(D.piso||{})[x.id];return x.hab+' '+t('hab1')+' · '+pl(x.camas,t('cama'),t('camas'))+' · '+fmt(x.banos)+' '+(x.banos===1?t('bano'):t('banos'))+' · '+cap(x)+(p?' · '+(p==='PB'?t('pb'):t('piso')+' '+p):'')+((D.niveles||{})[x.id]?' · '+pl((D.niveles||{})[x.id],t('nivel'),t('niveles')):'')}
function hasT(x,k){return x.tipo===k||((D.tipoExtra||{})[x.id]||[]).indexOf(k)>=0}
function tipo(x){return t('tipo')[x.tipo]||x.tipo}
function free(x,i){var p=D.cal[x.id];return !!(p&&i>=0&&i<p.length&&p[i])}
function minN(x,ci){var m=1;((D.mn||{})[x.id]||[]).forEach(function(r){if(ci>=r[0]&&ci<=r[1])m=r[2]});return m}
function quote(x,ci,co,g){
 var a=dIdx(ci),b=dIdx(co); if(!(b>a)) return null; var p=D.cal[x.id]; if(!p||a<0||b>p.length) return {fuera:true};
 var s=0; for(var i=a;i<b;i++){ if(!p[i]) return {ocupado:true}; s+=p[i]; }
 var n=b-a, mn=minN(x,ci); if(n<mn) return {min:mn};
 var f=D.fees[x.id]||[0,0,0], ex=(g&&f[1]&&g>f[1])?(g-f[1])*f[2]*n:0;
 return {noches:n,base:s,limpieza:f[0],extra:ex,total:s+f[0]+ex};
}
function desde(x){var p=D.cal[x.id]||[],m=0;for(var i=0;i<Math.min(p.length,60);i++){if(p[i]&&(!m||p[i]<m))m=p[i]}return m}
function abnb(x,ci,co,g){var q=[];if(ci&&co)q.push('check_in='+ci,'check_out='+co);if(g)q.push('adults='+g);return 'https://www.airbnb.com/rooms/'+x.id+(q.length?'?'+q.join('&'):'')}
function chat(x){return 'https://www.airbnb.com/contact_host/'+x.id+'/send_message'}
function waAsk(x,s){return wa(t('waAsk')+' '+x.titulo+(s&&s.ci&&s.co?' ('+t('del')+' '+fd(s.ci)+' '+t('al')+' '+fd(s.co)+')':'')+(s&&s.g?' '+t('para')+' '+s.g+' '+t('personas'):'')+': ')}
function toast(s){var e=$('toast');e.textContent=s;e.style.display='block';clearTimeout(toast.k);toast.k=setTimeout(function(){e.style.display='none'},2600)}
function opt(sel,v,s){var o=document.createElement('option');o.value=v;o.textContent=s;$(sel).appendChild(o)}
var today=iso(Date.now());
function paint(){
 document.documentElement.lang=lang;
 document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=t(e.dataset.t)});
 document.querySelectorAll('[data-tp]').forEach(function(e){e.placeholder=t(e.dataset.tp)});
 $('bLang').value=lang; $('bCur').value=cur$;
 $('waTop').href=$('waFab').href=wa(t('waRes')); $('waOwn').href=wa(t('waOwn'));
 var z=$('zona').value,h=$('hab').value,b=$('ban').value,g=$('hue').value,o=$('ord').value;
 var tp=$('tipoF').value; ['zona','hab','ban','hue','ord','tipoF'].forEach(function(i){$(i).innerHTML=''}); opt('tipoF','',t('todos')); ['Apartamento','Villa','Cabaña','Bungalow','Casita'].forEach(function(k){var n=L.filter(function(x){return hasT(x,k)}).length;if(n)opt('tipoF',k,t('tipo')[k]+' ('+n+')')}); $('tipoF').value=tp;
 opt('zona','',t('todas')); ZONAS.forEach(function(zz){var n=L.filter(function(x){return x.zona===zz}).length;if(n)opt('zona',zz,zz+' ('+n+')')});
 opt('hue',0,t('cuantos')); for(var n=1;n<=21;n++)opt('hue',n,pl(n,t('huesp'),t('huesps')));
 opt('hab',0,t('cualq')); [1,2,3,4,5].forEach(function(k){if(L.some(function(x){return x.hab>=k}))opt('hab',k,k+'+')});
 opt('ban','',t('cualq')); L.map(function(x){return x.banos}).filter(function(v,i,a){return a.indexOf(v)===i}).sort(function(a,c){return a-c}).forEach(function(v){opt('ban',v,fmt(v)+' '+(v===1?t('bano'):t('banos')))});
 opt('ord','',t('rec'));opt('ord','pa',t('pa'));opt('ord','pd',t('pd'));opt('ord','rt',t('rt'));
 $('zona').value=z;$('hab').value=h||0;$('ban').value=b;$('hue').value=g||0;$('ord').value=o;
 $('chips').innerHTML=CHIPS.filter(function(k){return L.some(function(x){return amen(x).indexOf(k)>=0})}).map(function(k){return '<button type="button" class="chip" data-chip="'+k+'">'+t('am')[k]+'</button>'}).join('');
 $('tasaTxt').textContent=cur$==='DOP'?' · '+t('tasa')+' '+D.tasa:'';
 render(); if($('det').classList.contains('open')){fillDetail();drawCal();drawQuote()}
}
function state(){return {tp:$('tipoF').value,z:$('zona').value,ci:$('ci').value,co:$('co').value,g:+$('hue').value,h:+$('hab').value,b:$('ban').value,o:$('ord').value}}
function priceHtml(x,s){
 var q=(s.ci&&s.co)?quote(x,s.ci,s.co,s.g):null;
 if(q&&q.total) return {q:q,h:'<div class="pr"><b>'+money(q.total)+'</b> '+t('total')+' · '+pl(q.noches,t('noche'),t('noches'))+'<small>'+money(q.total/q.noches)+' '+t('prom')+'</small></div>'};
 if(q&&q.min) return {q:q,h:'<div class="na">'+t('min')+' '+q.min+' '+t('minN')+'</div>'};
 if(q) return {q:q,h:'<div class="na">'+t('noDispCard')+'</div>'};
 var m=desde(x); return {q:null,h:'<div class="pr">'+(m?t('desde')+' <b>'+money(m)+'</b> '+t('porNoche'):'')+'<small>'+t('elige')+'</small></div>'};
}
function card(x,s){
 var P=priceHtml(x,s), q=P.q, ph=photos(x);
 var dots=ph.length>1?'<button class="nav l" data-nav="-1" type="button">‹</button><button class="nav r" data-nav="1" type="button">›</button><div class="dots">'+ph.map(function(_,i){return '<i'+(i?'':' class="on"')+'></i>'}).join('')+'</div>':'';
 return '<article class="card" data-open="'+x.id+'"><div class="ph" data-i="0" data-ph="'+esc(JSON.stringify(ph))+'"><img loading="lazy" referrerpolicy="no-referrer" src="'+img(ph[0])+'" alt="">'+dots+'<span class="tag">'+tipo(x)+'</span><button class="fav'+(saved(x.id)?' on':'')+'" data-fav="'+x.id+'" type="button">'+(saved(x.id)?'♥':'♡')+'</button></div>'
 +'<div class="bd"><div class="zr"><span class="zn">'+x.zona+'</span>'+(x.rating?'<span class="rk">'+(x.rating==='New'?t('nuevo'):'★ '+x.rating+(x.rv?' ('+x.rv+')':''))+'</span>':'')+'</div><h3>'+esc(x.titulo)+'</h3><div class="sp">'+specs(x)+'</div>'+P.h
 +'<div class="acts"><button class="go" data-open="'+x.id+'" type="button">'+(q&&q.total?t('verRes'):(q?t('verOtras'):t('verFechas')))+'</button><button class="add" data-ask="'+x.id+'" type="button">'+t('preg')+'</button></div></div></article>';
}
function score(x){return (x.rating&&x.rating!=='New'?+x.rating:4.5)*Math.log(2+(x.rv||0))}
var lastR=[];
function render(){
 var s=state(); if(s.ci&&(!s.co||s.co<=s.ci)){$('co').value=addD(s.ci,1);s.co=$('co').value} $('ci').min=today; $('co').min=s.ci?addD(s.ci,1):today;
 var r=L.filter(function(x){var a=amen(x);return (!s.tp||hasT(x,s.tp))&&(!s.z||x.zona===s.z)&&x.hab>=s.h&&(s.b===''||x.banos===+s.b)&&(x.huespedes_max||x.huespedes)>=s.g
  &&chips.every(function(k){return a.indexOf(k)>=0})&&(!verLista||(lists[verLista]||[]).indexOf(x.id)>=0)});
 var dates=s.ci&&s.co, na=0;
 if(dates){var ok=r.filter(function(x){var q=quote(x,s.ci,s.co,s.g);return q&&q.total}); na=r.length-ok.length; if(!showNA) r=ok;}
 var pv=function(x){if(dates){var q=quote(x,s.ci,s.co,s.g);return q&&q.total?q.total:1e9}return desde(x)||1e9};
 if(s.o==='pa')r.sort(function(a,b){return pv(a)-pv(b)}); else if(s.o==='pd')r.sort(function(a,b){return pv(b)%1e9-pv(a)%1e9}); else if(s.o==='rt')r.sort(function(a,b){return (+b.rating||0)-(+a.rating||0)}); else r.sort(function(a,b){return score(b)-score(a)});
 lastR=r;
 $('cnt').innerHTML=pl(r.length,t('prop'),t('props'))+(dates?' '+t('disp')+' '+fd(s.ci)+' '+t('al')+' '+fd(s.co):'')+(verLista?' · '+t('enLista')+' <b>'+esc(verLista)+'</b> <button class="lnk" data-clrlist type="button">'+t('quitar')+'</button>':'');
 $('naBox').style.display=dates&&na?'flex':'none'; $('naTxt').textContent=na+' '+(na>1?t('noDispN'):t('noDisp1'))+' · '+t('mostrar'); $('naChk').checked=showNA;
 $('g').innerHTML=r.length?r.map(function(x){return card(x,s)}).join(''):'<div class="empty">'+t('vacio')+(dates?t('vacio2'):'')+'</div>';
 var nf=0;Object.keys(lists).forEach(function(k){nf+=lists[k].length}); $('nFav').textContent=nf; $('nCart').textContent=cart.length;
 document.querySelectorAll('[data-chip]').forEach(function(b){b.classList.toggle('on',chips.indexOf(b.dataset.chip)>=0)});
 $('g').style.display=vista==='lista'?'':'none'; $('mapW').style.display=vista==='mapa'?'':'none';
 $('vL').classList.toggle('on',vista==='lista'); $('vM').classList.toggle('on',vista==='mapa');
 if(vista==='mapa')drawMap();
}
var map=null, layer=null;
function drawMap(){
 if(!window.L||!window.L.map){$('mapW').innerHTML='<div class="empty">Mapa no disponible.</div>';return}
 if(!map){map=window.L.map('map',{scrollWheelZoom:false});window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);layer=window.L.layerGroup().addTo(map)}
 setTimeout(function(){map.invalidateSize()},50);
 layer.clearLayers(); var s=state(), pts=[];
 lastR.forEach(function(x){var g=(D.geo||{})[x.id];if(!g)return;var P=priceHtml(x,s),lab=P.q&&P.q.total?money(P.q.total):(desde(x)?money(desde(x)):'•');
  var m=window.L.marker(g,{icon:window.L.divIcon({className:'pin',html:'<span>'+lab+'</span>',iconSize:null})}).addTo(layer);
  m.bindPopup('<div class="pop"><img referrerpolicy="no-referrer" src="'+img(photos(x)[0],320)+'" alt=""><b>'+esc(x.titulo)+'</b><br>'+specs(x)+'<br><button class="go" data-open="'+x.id+'" type="button">'+t('verFechas')+'</button></div>');pts.push(g)});
 if(pts.length)map.fitBounds(pts,{padding:[30,30],maxZoom:13});
}
var cur=null, sel={ci:'',co:''}, mOff=0;
function monthsBetween(a,b){var x=new Date(a),y=new Date(b);return (y.getUTCFullYear()-x.getUTCFullYear())*12+y.getUTCMonth()-x.getUTCMonth()}
function fillDetail(){
 var ph=photos(cur);
 $('dPh').innerHTML=ph.slice(0,5).map(function(p,i){return '<img'+(i?'':' class="big"')+' referrerpolicy="no-referrer" src="'+img(p,i?720:1200)+'" alt="">'}).join('');
 $('dT').textContent=cur.titulo; $('dZ').textContent=cur.zona+(cur.rating?' · '+(cur.rating==='New'?t('nuevo'):'★ '+cur.rating+(cur.rv?' ('+cur.rv+' '+t('resenas')+')':'')):'');
 $('dS').textContent=specs(cur); $('dA').innerHTML=amen(cur).map(function(k){return '<span>'+t('am')[k]+'</span>'}).join('');
 var gm=cur.huespedes_max||cur.huespedes, gv=+$('dG').value; $('dG').innerHTML=''; for(var k=1;k<=gm;k++)opt('dG',k,pl(k,t('huesp'),t('huesps'))); $('dG').value=gv&&gv<=gm?gv:Math.min(+$('hue').value||2,gm);
}
function openDetail(id){
 cur=byId(id); var s=state(); sel={ci:'',co:''}; $('dG').innerHTML='';
 if(s.ci&&s.co){var q=quote(cur,s.ci,s.co,s.g); if(q&&q.total)sel={ci:s.ci,co:s.co}}
 mOff=sel.ci?Math.max(0,monthsBetween(today,sel.ci)):0;
 fillDetail(); drawCal(); drawQuote(); $('det').classList.add('open'); document.body.style.overflow='hidden';
}
function rangeFree(a,b){for(var i=dIdx(a);i<dIdx(b);i++){if(!free(cur,i))return false}return true}
function month(y,m){
 var first=new Date(Date.UTC(y,m,1)), days=new Date(Date.UTC(y,m+1,0)).getUTCDate(), pad=first.getUTCDay(), p=D.cal[cur.id]||[];
 var h='<div class="mo"><h4>'+t('meses')[m]+' '+y+'</h4><div class="wk">'+t('dias').map(function(d){return '<i>'+d+'</i>'}).join('')+'</div><div class="days">';
 for(var i=0;i<pad;i++)h+='<span></span>';
 var mnSel=sel.ci?minN(cur,sel.ci):1;
 for(var d=1;d<=days;d++){
  var ds=iso(Date.UTC(y,m,d)), i2=dIdx(ds), pr=p[i2], past=ds<today, out=i2<0||i2>=p.length;
  var after=sel.ci&&!sel.co&&ds>sel.ci, rf=after&&rangeFree(sel.ci,ds);
  var canOut=rf&&dIdx(ds)-dIdx(sel.ci)>=mnSel, tooShort=rf&&!canOut;
  var dis=ds!==sel.co&&ds!==sel.ci&&(past||out||(after?!canOut:!pr));
  var cls='d'+(dis?' x':'')+(tooShort?' sh':'')+(ds===sel.ci||ds===sel.co?' s':'')+(sel.ci&&sel.co&&ds>sel.ci&&ds<sel.co?' in':'');
  h+='<button type="button" class="'+cls+'"'+(dis?' disabled':' data-day="'+ds+'"')+'><b>'+d+'</b>'+(pr&&!past?'<small>'+(cur$==='DOP'?(Math.round(pr*D.tasa/100)/10)+'k':'$'+pr)+'</small>':'')+'</button>';
 }
 return h+'</div></div>';
}
function drawCal(){
 var t0=new Date(today), y=t0.getUTCFullYear(), m=t0.getUTCMonth()+mOff, y1=y+Math.floor(m/12), m1=m%12, m2=(m1+1)%12, y2=y1+(m1===11?1:0);
 var max=monthsBetween(today,D.start)+Math.ceil(((D.cal[cur.id]||[]).length)/30);
 $('cal').innerHTML=month(y1,m1)+month(y2,m2); $('cPrev').disabled=mOff<=0; $('cNext').disabled=mOff>=max-1;
 var mn=sel.ci?minN(cur,sel.ci):1;
 $('cHint').textContent=!sel.ci?t('elLlegada'):(!sel.co?t('elSalida')+(mn>1?' ('+t('min')+' '+mn+' '+t('noches')+')':''):fd(sel.ci)+' → '+fd(sel.co));
}
function drawQuote(){
 var g=+$('dG').value, q=sel.ci&&sel.co?quote(cur,sel.ci,sel.co,g):null;
 if(q&&q.total){
  $('dQ').innerHTML='<div class="ql"><span>'+money(q.base/q.noches)+' × '+pl(q.noches,t('noche'),t('noches'))+'</span><span>'+money(q.base)+'</span></div><div class="ql"><span>'+t('limpieza')+'</span><span>'+money(q.limpieza)+'</span></div>'+(q.extra?'<div class="ql"><span>'+t('hExtra')+'</span><span>'+money(q.extra)+'</span></div>':'')+'<div class="ql t"><span>'+t('totEst')+'</span><span>'+money(q.total)+'</span></div><small>'+t('nota')+'</small>';
  $('dGo').href=abnb(cur,sel.ci,sel.co,g); $('dGo').classList.remove('off'); $('dAdd').disabled=false;
 } else {
  $('dQ').innerHTML='<small>'+t('selFechas')+'</small>'; $('dGo').href=abnb(cur,'','',g); $('dGo').classList.add('off'); $('dAdd').disabled=true;
 }
}
$('cal').addEventListener('click',function(e){var b=e.target.closest('[data-day]');if(!b)return;var d=b.dataset.day;
 if(!sel.ci||sel.co||d<=sel.ci){ if(!free(cur,dIdx(d))) return; sel={ci:d,co:''} } else sel.co=d;
 drawCal(); drawQuote();});
$('cPrev').onclick=function(){mOff--;drawCal()}; $('cNext').onclick=function(){mOff++;drawCal()};
$('cClr').onclick=function(){sel={ci:'',co:''};drawCal();drawQuote()};
$('dG').addEventListener('change',drawQuote);
function closeDetail(){$('det').classList.remove('open');document.body.style.overflow=''}
$('dX').onclick=closeDetail; $('det').addEventListener('click',function(e){if(e.target.id==='det')closeDetail()});
$('dAdd').onclick=function(){cart.push({id:cur.id,ci:sel.ci,co:sel.co,g:+$('dG').value||1});lsSet('gw_cart',cart);render();toast(t('agregado'))};
$('dAskA').onclick=function(){window.open(chat(cur),'_blank')};
$('dAskW').onclick=function(){window.open(waAsk(cur,{ci:sel.ci,co:sel.co,g:+$('dG').value}),'_blank')};
$('dFav').onclick=function(){listPicker(cur.id)};
$('dAlert').onclick=function(){openAlert(cur.id,sel)};
function ask(id){var x=byId(id),s=state();$('askP').textContent=x.titulo;$('askA').href=chat(x);$('askW').href=waAsk(x,s);$('ask').classList.add('open')}
$('askC').onclick=function(){$('ask').classList.remove('open')};
var pickId=null;
function listPicker(id){pickId=id;var names=Object.keys(lists);if(!names.length){lists[lang==='es'?'Favoritos':'Favorites']=[];names=Object.keys(lists)}
 $('lpB').innerHTML=names.map(function(n){return '<label class="lp"><input type="checkbox" data-lp="'+esc(n)+'"'+(lists[n].indexOf(id)>=0?' checked':'')+'> '+esc(n)+' <small>('+lists[n].length+')</small></label>'}).join('');$('lpN').value='';$('lp').classList.add('open')}
$('lpB').addEventListener('change',function(e){var n=e.target.dataset.lp;if(!n)return;var a=lists[n],i=a.indexOf(pickId);if(e.target.checked&&i<0)a.push(pickId);if(!e.target.checked&&i>=0)a.splice(i,1);lsSet('gw_lists',lists);render()});
$('lpAdd').onclick=function(){var n=$('lpN').value.trim();if(!n)return;if(!lists[n])lists[n]=[];if(lists[n].indexOf(pickId)<0)lists[n].push(pickId);lsSet('gw_lists',lists);listPicker(pickId);render();toast(t('guardadoEn')+' '+n)};
$('lpC').onclick=function(){$('lp').classList.remove('open')};
function openLists(){$('drT').textContent=t('listasT');var names=Object.keys(lists);
 $('drB').innerHTML=names.length?names.map(function(n){var ids=lists[n];return '<div class="lst"><div class="lh"><b>'+esc(n)+'</b> <small>'+pl(ids.length,t('prop'),t('props'))+'</small></div><div class="thumbs">'+ids.slice(0,4).map(function(id){var x=byId(id);return x?'<img referrerpolicy="no-referrer" src="'+img(photos(x)[0],240)+'" alt="">':''}).join('')+'</div><div class="r"><button data-seelist="'+esc(n)+'" type="button">'+t('ver')+'</button><button data-sharelist="'+esc(n)+'" type="button">'+t('compartir')+'</button><button data-dellist="'+esc(n)+'" type="button">'+t('borrarL')+'</button></div></div>'}).join(''):'<p>'+t('listasVacio')+'</p>';
 $('drF').innerHTML='';$('dr').classList.add('open')}
function openCart(){$('drT').textContent=t('cotT');var tot=0,lines=[];
 $('drB').innerHTML=cart.length?cart.map(function(c,i){var x=byId(c.id);if(!x)return '';var q=quote(x,c.ci,c.co,c.g),v=q&&q.total?money(q.total):t('yaNo');if(q&&q.total)tot+=q.total;
  lines.push('• '+x.titulo+' — '+fd(c.ci)+' '+t('al')+' '+fd(c.co)+', '+c.g+' '+t('personas')+' — '+v+'\n  '+abnb(x,c.ci,c.co,c.g));
  return '<div class="it"><img src="'+img(photos(x)[0],240)+'" referrerpolicy="no-referrer" alt=""><div><h4>'+esc(x.titulo)+'</h4><p>'+fd(c.ci)+' → '+fd(c.co)+' · '+pl(c.g,t('huesp'),t('huesps'))+' · <b>'+v+'</b></p><div class="r"><a href="'+abnb(x,c.ci,c.co,c.g)+'" target="_blank" rel="noopener">'+t('reservarA')+'</a><button data-rm="'+i+'" type="button">'+t('quitar')+'</button></div></div></div>'}).join(''):'<p>'+t('cotVacio')+'</p>';
 $('drF').innerHTML=cart.length?'<div class="tot"><span>'+t('totEst')+'</span><span>'+money(tot)+'</span></div><small>'+t('cotNota')+'</small><a class="cta" target="_blank" rel="noopener" href="'+wa(t('waCot')+'\n'+lines.join('\n')+'\n'+t('totEst')+': '+money(tot))+'">'+t('enviar')+'</a>':'';
 $('dr').classList.add('open')}
var alertCtx=null;
function openAlert(id,s){var x=byId(id);alertCtx={id:id,ci:s.ci||'',co:s.co||''};$('mdP').textContent=x.titulo+(s.ci&&s.co?' · '+fd(s.ci)+' → '+fd(s.co):'')+'. '+t('mdP');$('md').classList.add('open')}
$('mdS').onclick=function(){var em=$('mdE').value.trim(),nm=$('mdN').value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)){toast(t('correoMal'));return}
 var x=byId(alertCtx.id),p={tipo:'alerta',nombre:nm,correo:em,listing:x.id,titulo:x.titulo,llegada:alertCtx.ci,salida:alertCtx.co,huespedes:+$('dG').value||+$('hue').value||0,idioma:lang};
 if(D.alertUrl){fetch(D.alertUrl,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify(p)}).then(function(){toast(t('listoAv')+' '+em)}).catch(function(){window.open(wa(t('waAvisa')+' '+em+' '+t('siLibera')+' '+x.titulo),'_blank')})}
 else window.open(wa(t('waAvisa')+' '+em+' '+t('siLibera')+' '+x.titulo+(alertCtx.ci?' ('+fd(alertCtx.ci)+' → '+fd(alertCtx.co)+')':'')),'_blank');
 $('md').classList.remove('open');$('mdE').value='';$('mdN').value=''};
$('mdC').onclick=function(){$('md').classList.remove('open')};
document.addEventListener('click',function(e){
 var el=e.target.closest('[data-nav],[data-fav],[data-ask],[data-open],[data-rm],[data-chip],[data-seelist],[data-sharelist],[data-dellist],[data-clrlist]'); if(!el)return;
 if(el.dataset.nav){e.stopPropagation();var ph=el.closest('.ph'),a=JSON.parse(ph.dataset.ph),i=(+ph.dataset.i+ +el.dataset.nav+a.length)%a.length;ph.dataset.i=i;ph.querySelector('img').src=img(a[i]);ph.querySelectorAll('.dots i').forEach(function(d,k){d.classList.toggle('on',k===i)});return}
 if(el.dataset.fav){e.stopPropagation();listPicker(el.dataset.fav);return}
 if(el.dataset.ask){e.stopPropagation();ask(el.dataset.ask);return}
 if(el.dataset.chip){var k=el.dataset.chip,i=chips.indexOf(k);if(i>=0)chips.splice(i,1);else chips.push(k);render();return}
 if(el.dataset.rm){cart.splice(+el.dataset.rm,1);lsSet('gw_cart',cart);render();openCart();return}
 if(el.dataset.seelist){verLista=el.dataset.seelist;$('dr').classList.remove('open');render();return}
 if(el.dataset.sharelist){var n=el.dataset.sharelist;openShare(n,t('shLista')+' “'+n+'”',urlLista(n));return}
 if(el.dataset.dellist){delete lists[el.dataset.dellist];lsSet('gw_lists',lists);if(verLista===el.dataset.dellist)verLista='';render();openLists();return}
 if(el.hasAttribute('data-clrlist')){verLista='';render();return}
 if(el.dataset.open){openDetail(el.dataset.open)}
});
$('naChk').addEventListener('change',function(){showNA=this.checked;render()});
$('bCart').onclick=openCart; $('bFav').onclick=openLists; $('drX').onclick=function(){$('dr').classList.remove('open')};
$('bLang').onchange=function(){lang=this.value;lsSet('gw_lang',lang);paint()};
$('bCur').onchange=function(){cur$=this.value;lsSet('gw_cur',cur$);paint()};
$('vL').onclick=function(){vista='lista';render()}; $('vM').onclick=function(){vista='mapa';render()};
['tipoF','zona','ci','co','hue','hab','ban','ord'].forEach(function(i){$(i).addEventListener('change',render)});
$('clr').onclick=function(){$('tipoF').value='';$('ci').value='';$('co').value='';$('zona').value='';$('hue').value=0;$('hab').value=0;$('ban').value='';chips=[];verLista='';showNA=false;render()};
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeDetail();['ask','lp','md','dr','sh'].forEach(function(i){$(i).classList.remove('open')})}});

/* ---- Compartir: anuncio, búsqueda y listas (enlaces a guelcom.co) ---- */
var BASE='https://guelcom.co/';
Object.assign(TX.es,{compartir:'Compartir',shT:'Compartir',shW:'WhatsApp',shC:'Copiar enlace',shN:'Más opciones',copiado:'Enlace copiado',compartirP:'Compartir',compartirB:'Compartir búsqueda',listaComp:'Lista compartida',shLista:'Mira mi lista',shBusq:'Mira estas opciones en Güelcom Stays',shProp:'Mira este lugar en Güelcom Stays'});
Object.assign(TX.en,{compartir:'Share',shT:'Share',shW:'WhatsApp',shC:'Copy link',shN:'More options',copiado:'Link copied',compartirP:'Share',compartirB:'Share search',listaComp:'Shared list',shLista:'Check out my list',shBusq:'Check out these stays at Güelcom Stays',shProp:'Check out this place at Güelcom Stays'});
Object.assign(TX.fr,{compartir:'Partager',shT:'Partager',shW:'WhatsApp',shC:'Copier le lien',shN:"Plus d'options",copiado:'Lien copié',compartirP:'Partager',compartirB:'Partager la recherche',listaComp:'Liste partagée',shLista:'Regarde ma liste',shBusq:'Regarde ces logements sur Güelcom Stays',shProp:'Regarde ce logement sur Güelcom Stays'});
function qs(o){var a=[];for(var k in o){var v=o[k];if(Array.isArray(v))v=v.join(',');if(v!==''&&v!=null&&v!==0&&v!=='0')a.push(k+'='+encodeURIComponent(v))}return a.length?'?'+a.join('&'):''}
function urlBusq(){var s=state();return BASE+qs({tp:s.tp,z:s.z,ci:s.ci,co:s.co,g:s.g,h:s.h,b:s.b,o:s.o,am:chips})}
function urlProp(x){return BASE+qs({p:x.id,ci:sel.ci,co:sel.co,g:+$('dG').value||''})}
function urlLista(n){return BASE+qs({l:n,ids:lists[n]||[]})}
var shTxt='',shUrl='';
function openShare(titulo,txt,url){shTxt=txt;shUrl=url;$('shP').textContent=titulo;$('shU').value=url;$('shW').href='https://wa.me/?text='+encodeURIComponent(txt+'\n'+url);$('shN').style.display=navigator.share?'':'none';$('sh').classList.add('open')}
$('shC').onclick=function(){var ok=function(){toast(t('copiado'))};var fb=function(){$('shU').select();try{document.execCommand('copy');ok()}catch(e){}};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(shUrl).then(ok,fb);else fb()};
$('shN').onclick=function(){navigator.share({title:'Güelcom Stays',text:shTxt,url:shUrl}).catch(function(){})};
$('shX').onclick=function(){$('sh').classList.remove('open')};
$('sh').addEventListener('click',function(e){if(e.target.id==='sh')$('sh').classList.remove('open')});
$('dShare').onclick=function(){openShare(cur.titulo,t('shProp')+': '+cur.titulo,urlProp(cur))};
$('bShareS').onclick=function(){openShare(t('compartirB'),t('shBusq'),urlBusq())};
function aplicarEnlace(){
 var q;try{q=new URLSearchParams(location.search)}catch(e){return}
 if(!q.toString())return;
 var set=function(id,k){var v=q.get(k);if(v==null)return;var el=$(id);if([].some.call(el.options||[],function(o){return o.value===v}))el.value=v};
 set('tipoF','tp');set('zona','z');set('hue','g');set('hab','h');set('ban','b');set('ord','o');
 var ci=q.get('ci')||'',co=q.get('co')||'',re=/^\d{4}-\d{2}-\d{2}$/;
 if(re.test(ci)&&re.test(co)&&ci>=today&&co>ci){$('ci').value=ci;$('co').value=co}
 chips=(q.get('am')||'').split(',').filter(function(k){return CHIPS.indexOf(k)>=0});
 var n=(q.get('l')||'').trim().slice(0,60);
 if(n){var ids=(q.get('ids')||'').split(',').filter(function(id){return byId(id)});
  if(ids.length){var a=lists[n]||(lists[n]=[]);ids.forEach(function(id){if(a.indexOf(id)<0)a.push(id)});lsSet('gw_lists',lists);verLista=n;toast(t('listaComp')+': '+n)}}
 render();
 var p=q.get('p');if(p&&byId(p))openDetail(p);
 try{history.replaceState(null,'',location.pathname)}catch(e){}
}
$('y').textContent=new Date().getFullYear(); $('upd').textContent=D.updated;
paint();
aplicarEnlace();
})();

(function(){
var D=window.GW_DATA||{},WA='13523549663',$=function(i){return document.getElementById(i)};
var OT={
es:{t:'Cuéntanos de tu propiedad',s:'2 minutos. Con esto te llamamos con una propuesta y un estimado real para tu unidad.',c:'Tus datos',p:'La propiedad',e:'Situación actual',a:'¿Qué tiene?',n:'Nombre',w:'WhatsApp',m:'Correo (opcional)',tipo:'Tipo',zona:'Zona',sec:'Sector / proyecto',hab:'Habitaciones',ban:'Baños',cap:'Capacidad (personas)',amu:'¿Amueblada?',air:'¿Está en Airbnb hoy?',link:'Link del anuncio (si tiene)',uso:'¿La usas tú?',cuando:'¿Cuándo quieres empezar?',com:'Algo más que debamos saber',env:'Enviar',can:'Cancelar',req:'Completa nombre, WhatsApp, tipo, zona y habitaciones',ok:'¡Recibido! Te contactamos pronto.',wa:'Nueva propiedad para administrar',sel:'Elegir…',
o:{tipo:['Apartamento','Villa','Casa','Cabaña','Penthouse','Otro'],zona_otra:'Otra',amu:['Sí, completa','Parcial','No'],air:['Sí, la manejo yo','Sí, con otro administrador','Antes sí','No, nunca'],uso:['No, 100% renta','Algunas fechas al año','Bastante'],cuando:['Ya','En 1–3 meses','Solo estoy explorando']},
am:['Piscina','Jacuzzi','Vista al mar','Playa a pie','Planta / inversor','Parqueo','Lavadora','Gimnasio','Wi-Fi','Seguridad 24h']},
en:{t:'Tell us about your property',s:'2 minutes. We’ll call you back with a proposal and a real estimate for your unit.',c:'Your details',p:'The property',e:'Current situation',a:'What does it have?',n:'Name',w:'WhatsApp',m:'Email (optional)',tipo:'Type',zona:'Area',sec:'Neighborhood / building',hab:'Bedrooms',ban:'Bathrooms',cap:'Capacity (guests)',amu:'Furnished?',air:'Is it on Airbnb today?',link:'Listing link (if any)',uso:'Do you use it yourself?',cuando:'When would you like to start?',com:'Anything else we should know',env:'Send',can:'Cancel',req:'Please fill in name, WhatsApp, type, area and bedrooms',ok:'Received! We’ll contact you soon.',wa:'New property to manage',sel:'Choose…',
o:{tipo:['Apartment','Villa','House','Cabin','Penthouse','Other'],zona_otra:'Other',amu:['Yes, fully','Partly','No'],air:['Yes, I manage it','Yes, with another manager','It used to be','No, never'],uso:['No, 100% rental','A few dates a year','Quite a lot'],cuando:['Right away','In 1–3 months','Just exploring']},
am:['Pool','Jacuzzi','Ocean view','Walk to beach','Generator / inverter','Parking','Washer','Gym','Wi-Fi','24h security']},
fr:{t:'Parlez-nous de votre logement',s:'2 minutes. Nous vous rappelons avec une proposition et une estimation réelle.',c:'Vos coordonnées',p:'Le logement',e:'Situation actuelle',a:'Équipements',n:'Nom',w:'WhatsApp',m:'E-mail (facultatif)',tipo:'Type',zona:'Zone',sec:'Quartier / résidence',hab:'Chambres',ban:'Salles de bain',cap:'Capacité (personnes)',amu:'Meublé ?',air:'Est-il sur Airbnb aujourd’hui ?',link:'Lien de l’annonce (le cas échéant)',uso:'L’utilisez-vous vous-même ?',cuando:'Quand souhaitez-vous commencer ?',com:'Autre chose à savoir',env:'Envoyer',can:'Annuler',req:'Indiquez nom, WhatsApp, type, zone et chambres',ok:'Reçu ! Nous vous contactons bientôt.',wa:'Nouveau logement à gérer',sel:'Choisir…',
o:{tipo:['Appartement','Villa','Maison','Cabane','Penthouse','Autre'],zona_otra:'Autre',amu:['Oui, entièrement','En partie','Non'],air:['Oui, je le gère','Oui, avec un autre gestionnaire','Avant oui','Non, jamais'],uso:['Non, 100 % location','Quelques dates par an','Souvent'],cuando:['Tout de suite','Dans 1 à 3 mois','Je me renseigne']},
am:['Piscine','Jacuzzi','Vue mer','Plage à pied','Groupe électrogène / onduleur','Parking','Lave-linge','Salle de sport','Wi-Fi','Sécurité 24h']}};
function L(){var l=document.documentElement.lang;return OT[l]?l:'es'}
function e(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function opts(a,ph){return '<option value="">'+ph+'</option>'+a.map(function(v){return '<option>'+e(v)+'</option>'}).join('')}
function zonas(){var z=[];(D.listings||[]).forEach(function(x){if(x.zona&&z.indexOf(x.zona)<0)z.push(x.zona)});return z}
function num(id,max){var a=[];for(var i=1;i<=max;i++)a.push(i+(i===max?'+':''));return a}
function build(){var T=OT[L()],o=T.o;
 $('owB').innerHTML='<h3>'+e(T.t)+'</h3><p>'+e(T.s)+'</p>'+
 '<h4>'+T.c+'</h4><div class="fg"><label>'+T.n+' *<input id="o_n" type="text" autocomplete="name"></label><label>'+T.w+' *<input id="o_w" type="tel" autocomplete="tel" placeholder="+1 809 …"></label><label class="full">'+T.m+'<input id="o_m" type="email" autocomplete="email"></label></div>'+
 '<h4>'+T.p+'</h4><div class="fg"><label>'+T.tipo+' *<select id="o_tipo">'+opts(o.tipo,T.sel)+'</select></label><label>'+T.zona+' *<select id="o_zona">'+opts(zonas().concat([o.zona_otra]),T.sel)+'</select></label><label class="full">'+T.sec+'<input id="o_sec" type="text"></label><label>'+T.hab+' *<select id="o_hab">'+opts(num(0,8),T.sel)+'</select></label><label>'+T.ban+'<select id="o_ban">'+opts(['1','1.5','2','2.5','3','3.5','4','5+'],T.sel)+'</select></label><label>'+T.cap+'<select id="o_cap">'+opts(num(0,20),T.sel)+'</select></label><label>'+T.amu+'<select id="o_amu">'+opts(o.amu,T.sel)+'</select></label></div>'+
 '<h4>'+T.e+'</h4><div class="fg"><label class="full">'+T.air+'<select id="o_air">'+opts(o.air,T.sel)+'</select></label><label class="full">'+T.link+'<input id="o_link" type="url" placeholder="airbnb.com/rooms/…"></label><label>'+T.uso+'<select id="o_uso">'+opts(o.uso,T.sel)+'</select></label><label>'+T.cuando+'<select id="o_cuando">'+opts(o.cuando,T.sel)+'</select></label></div>'+
 '<h4>'+T.a+'</h4><div class="ck">'+T.am.map(function(a,i){return '<label><input type="checkbox" value="'+e(a)+'"> '+e(a)+'</label>'}).join('')+'</div>'+
 '<label class="full lb">'+T.com+'<textarea id="o_com" rows="3"></textarea></label>'+
 '<button class="cta" id="owS" type="button">'+T.env+'</button><button class="lnk" id="owC" type="button">'+T.can+'</button>';
 $('owS').onclick=send;$('owC').onclick=close}
function v(id){var x=$(id);return x?x.value.trim():''}
function close(){$('own').classList.remove('open')}
function send(){var T=OT[L()];
 var p={tipo_form:'propietario',nombre:v('o_n'),whatsapp:v('o_w'),correo:v('o_m'),tipo:v('o_tipo'),zona:v('o_zona'),sector:v('o_sec'),habitaciones:v('o_hab'),banos:v('o_ban'),capacidad:v('o_cap'),amueblada:v('o_amu'),airbnb:v('o_air'),link:v('o_link'),uso:v('o_uso'),inicio:v('o_cuando'),amenidades:[].map.call(document.querySelectorAll('#owB .ck input:checked'),function(c){return c.value}).join(', '),comentarios:v('o_com'),idioma:L(),fecha:new Date().toISOString()};
 if(!p.nombre||!p.whatsapp||!p.tipo||!p.zona||!p.habitaciones){toast2(T.req);return}
 var lines=['*'+T.wa+'*',T.n+': '+p.nombre,T.w+': '+p.whatsapp,p.correo&&T.m.replace(/ \(.*\)/,'')+': '+p.correo,T.tipo+': '+p.tipo,T.zona+': '+p.zona+(p.sector?' · '+p.sector:''),T.hab+': '+p.habitaciones+(p.banos?' · '+T.ban+': '+p.banos:'')+(p.capacidad?' · '+T.cap+': '+p.capacidad:''),p.amueblada&&T.amu+' '+p.amueblada,p.airbnb&&T.air+' '+p.airbnb,p.link&&p.link,p.uso&&T.uso+' '+p.uso,p.inicio&&T.cuando+' '+p.inicio,p.amenidades&&T.a+' '+p.amenidades,p.comentarios&&T.com+': '+p.comentarios].filter(Boolean).join('\n');
 if(D.ownUrl){fetch(D.ownUrl,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify(p)}).then(function(){toast2(T.ok)}).catch(function(){window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(lines),'_blank')})}
 else window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(lines),'_blank');
 close()}
function toast2(s){var t=$('toast');t.textContent=s;t.style.display='block';clearTimeout(toast2.k);toast2.k=setTimeout(function(){t.style.display='none'},3000)}
$('oOpen').onclick=function(){build();$('own').classList.add('open');setTimeout(function(){$('o_n').focus()},50)};
$('own').onclick=function(ev){if(ev.target===this)close()};
document.addEventListener('keydown',function(ev){if(ev.key==='Escape')close()});
})();
