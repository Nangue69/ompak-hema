import { readdir, mkdir } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const LOGO = 'img/logo-hema.png';
const DESTINO_ICONOS = 'public/icons';

const CARPETAS = [
  {
    origen: 'img',
    destino: 'public/img/fotos',
    nombres: {
      PXL_20260626_140814965: 'wms-scan-tote',
      PXL_20260626_140821929: 'wms-pack-tote',
      PXL_20260626_140933544: 'wms-confirm-tote',
      PXL_20260626_140803819: 'puesto-trabajo',
      PXL_20260618_175415029: 'tote-manteles',
      PXL_20260618_175420846: 'medidas-caja',
      'PXL_20201128_092136775.MP': 'tote-bolsas',
      PXL_20201128_092142367: 'tote-fiambreras',
      IMG_20200331_085158: 'nave-ompak'
    }
  },
  {
    origen: 'img/pasos',
    destino: 'public/img/pasos',
    nombres: {
      foto1: 'cajas-linea',
      foto2: 'caja-balanza',
      foto3: 'escanear-articulo',
      foto4: 'pantalla-datos-articulo',
      foto5: 'escanear-caja',
      foto6: 'pantalla-peso',
      foto7: 'pantalla-llenado',
      PXL_20261009_155041130: 'pantalla-confirmar-tote',
      PXL_20261009_155045622: 'pantalla-siguiente-tote'
    }
  }
];

for (const { origen, destino, nombres } of CARPETAS) {
  await mkdir(destino, { recursive: true });

  const fotos = (await readdir(origen)).filter((archivo) => /\.jpe?g$/i.test(archivo));

  for (const foto of fotos) {
    const clave = basename(foto, extname(foto));
    const salida = join(destino, `${nombres[clave] || clave.toLowerCase()}.webp`);

    await sharp(join(origen, foto))
      .rotate()
      .resize({ width: 1280, height: 1280, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(salida);

    console.log('foto ->', salida);
  }
}

await mkdir(DESTINO_ICONOS, { recursive: true });
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
