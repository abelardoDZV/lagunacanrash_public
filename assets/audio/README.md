# Música de la presentación de TV

`andean-riff.mp3` es la copia MP3 publicada por Freesound de
**«andean riff.wav»**, interpretada por **red3zzz**. Su ficha la describe como
una frase andina interpretada por el autor, con instrumentos de viento y eco.

- Fuente: https://freesound.org/people/red3zzz/sounds/131307/
- Archivo: https://cdn.freesound.org/previews/131/131307_1950871-hq.mp3
- Licencia: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/),
  verificada el 2026-10-23. Permite copiar, adaptar, distribuir y reproducir,
  también con fines comerciales; no exige atribución.
- Duración del original: aproximadamente 10,785 segundos; mono, 44,1 kHz.
- SHA256 de la copia MP3: `73b86a46166f58591a8ad50fbb07ec673c21cec19df1a91f6082892d6b43ad09`.

La variante `assets/images/video_drone_toda_laguna_andina.mp4` enlaza cinco
frases con fundidos, reduce ligeramente el tempo y ajusta el nivel musical
a -24 LUFS antes de las entradas y salidas suaves. No contiene voces.
Conserva la pista H.264 del video original sin recomprimir, añade AAC-LC
estéreo a 48 kHz y sitúa los metadatos de reproducción al principio del MP4.
La duración final es de aproximadamente 46,967 segundos.
La verificación del archivo preparado dio -24,2 LUFS y un pico verdadero de
-15,3 dBFS. La pista H.264 tiene el mismo SHA256 que la del video original:
`dfc0813cd8958b6706e47f617cadb914958883d17f16cc95ef49a8c7bc8549e6`.

Se prepara con FFmpeg, sin descargar recursos durante el proceso:

```sh
python3 scripts/prepare-tv-music.py
```

Se puede indicar otro ejecutable con `--ffmpeg RUTA`. La orden sustituye solo
la variante musical. La pista original y el video sin sonido se conservan.

Admin usa esta variante en «Galería de fotos y video». Publicar este archivo
en Public antes de publicar su referencia en Admin. El volumen del televisor
sigue dependiendo del control remoto; el reproductor ofrece silenciar y
activar la música. El audio y la imagen comparten un único reproductor para
la compatibilidad con webOS 3.5.
