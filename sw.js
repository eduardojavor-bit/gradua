// Guarda o app e as grades no aparelho para funcionar sem internet. O nome do cache muda a cada
// versão (gerado no build): a versão nova substitui a antiga na próxima vez que o app abrir.
const CACHE = 'gradua-16.3 Beta';
const ARQUIVOS = [
  './', 'index.html', 'gradua.js', 'estilos.css', 'manifest.webmanifest',
  'icones/icone-app.svg', 'icones/apple-touch-icon.png', 'icones/icone-192.png', 'icones/icone-512.png',
  'icones/icone-maskable-512.png', 'icones/ic_combina.svg', 'icones/ic_capelo.svg',
  'icones/ic_nav_inicio.svg', 'icones/ic_nav_inicio_cheio.svg', 'icones/ic_nav_semestre.svg', 'icones/ic_nav_semestre_cheio.svg',
  'icones/ic_nav_grade.svg', 'icones/ic_nav_grade_cheio.svg',
  'icones/ic_nav_matricula.svg', 'icones/ic_nav_matricula_cheio.svg',
  'dados/ementas_gea_4_1.json', 'dados/ementas_gea_4_2.json', 'dados/ementas_gea_5_1.json', 'dados/ementas_geb_6_2.json', 'dados/ementas_geb_8_1.json', 'dados/ementas_geb_8_2.json', 'dados/ementas_gec_7_1.json', 'dados/ementas_gec_7_2.json', 'dados/ementas_gec_9_1.json', 'dados/ementas_gec_9_2.json', 'dados/ementas_gel_1_1.json', 'dados/ementas_gel_1_2.json', 'dados/ementas_gel_2_1.json', 'dados/ementas_gel_2_2.json', 'dados/ementas_gep_1_1.json', 'dados/ementas_gep_1_2.json', 'dados/ementas_gep_3_1.json', 'dados/ementas_gep_3_2.json', 'dados/ementas_ges_1_1.json', 'dados/ementas_ges_1_2.json', 'dados/ementas_ges_3_1.json', 'dados/ementas_ges_3_2.json', 'dados/ementas_get_12_1.json', 'dados/ementas_get_12_2.json', 'dados/ementas_get_9_1.json', 'dados/ementas_get_9_2.json', 'dados/grade_gea_4_1.json', 'dados/grade_gea_4_2.json', 'dados/grade_gea_5_1.json', 'dados/grade_geb_6_2.json', 'dados/grade_geb_8_1.json', 'dados/grade_geb_8_2.json', 'dados/grade_gec_7_1.json', 'dados/grade_gec_7_2.json', 'dados/grade_gec_9_1.json', 'dados/grade_gec_9_2.json', 'dados/grade_gel_1_1.json', 'dados/grade_gel_1_2.json', 'dados/grade_gel_2_1.json', 'dados/grade_gel_2_2.json', 'dados/grade_gep_1_1.json', 'dados/grade_gep_1_2.json', 'dados/grade_gep_3_1.json', 'dados/grade_gep_3_2.json', 'dados/grade_ges_1_1.json', 'dados/grade_ges_1_2.json', 'dados/grade_ges_3_1.json', 'dados/grade_ges_3_2.json', 'dados/grade_get_12_1.json', 'dados/grade_get_12_2.json', 'dados/grade_get_9_1.json', 'dados/grade_get_9_2.json'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n.startsWith('gradua-') && n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (evento) => {
  if (evento.request.method !== 'GET') return;
  evento.respondWith(
    caches.match(evento.request, { ignoreSearch: true }).then((salvo) => salvo || fetch(evento.request)),
  );
});
