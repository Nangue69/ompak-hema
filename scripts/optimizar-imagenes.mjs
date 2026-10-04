import { readdir, mkdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const ORIGEN = 'img';
const DESTINO_FOTOS = 'public/img/fotos';
const DESTINO_ICONOS = 'public/icons';
const LOGO = 'img/logo-hema.png';

const NOMBRES = {
  'PXL_20260626_140814965': 'wms-scan-tote',
  'PXL_20260626_140821929': 'wms-pack-tote',
  'PXL_20260626_140933544': 'wms-confirm-tote',
  'PXL_20260626_140803819': 'puesto-trabajo',
  'PXL_20260618_175415029': 'tote-manteles',
  'PXL_20260618_175420846': 'medidas-caja',
  'PXL_20201128_092136775.MP': 'tote-bolsas',
  'PXL_20201128_092142367': 'tote-fiambreras',
  'IMG_20200331_085158': 'nave-ompak'
};

await mkdir(DESTINO_FOTOS, { recursive: true });
await mkdir(DESTINO_ICONOS, { recursive: true });

const fotos = (await readdir(ORIGEN)).filter((archivo) => /\.jpe?g$/i.test(archivo));

for (const foto of fotos) {
  const clave = basename(foto, extname(foto));
  const nombre = NOMBRES[clave] || clave.toLowerCase();
  const salida = join(DESTINO_FOTOS, `${nombre}.webp`);

  await sharp(join(ORIGEN, foto))
    .rotate()
    .resize({ width: 1280, height: 1280, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(salida);

  console.log('foto ->', salida);
}

await sharp(LOGO).resize(512, 512, { fit: 'contain', background: '#ffffff' }).png().toFile('public/img/logo-hema.png');

const iconoBase = await sharp(LOGO)
  .resize(400, 400, { fit: 'contain', background: { r: 227, g: 6, b: 19 } })
  .extend({ top: 56, bottom: 56, left: 56, right: 56, background: { r: 227, g: 6, b: 19 } })
  .png()
  .toBuffer();

for (const tam of [192, 512]) {
  await sharp(iconoBase).resize(tam, tam).toFile(join(DESTINO_ICONOS, `icon-${tam}.png`));
}

await sharp(iconoBase)
  .resize(410, 410)
  .extend({ top: 51, bottom: 51, left: 51, right: 51, background: { r: 227, g: 6, b: 19 } })
  .png()
  .toFile(join(DESTINO_ICONOS, 'icon-maskable-512.png'));

console.log('iconos listos');
