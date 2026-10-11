## Contexto compartido del proyecto

Este repositorio forma parte del proyecto Laguna Canrash. Antes de trabajar, leer las instrucciones comunes y el mapa de interacciones de [lagunacanrash/AGENTS.md](https://github.com/abelardoDZV/lagunacanrash/blob/main/AGENTS.md), además de estas instrucciones locales.

- Si el repositorio central está clonado como carpeta hermana, leer `../lagunacanrash/AGENTS.md`.
- Si no está disponible localmente, consultar su versión actual:

  ```bash
  gh api repos/abelardoDZV/lagunacanrash/contents/AGENTS.md --jq .content | base64 --decode
  ```

- El repositorio central es privado y requiere acceso autorizado. Si no se puede leer, informar qué contexto falta antes de realizar cambios que dependan de él.
- Revisar el impacto en los demás componentes y sus contratos antes de cambiar una integración. Actualizar el mapa central cuando cambien responsabilidades o relaciones verificadas.
- Mantener las instrucciones compartidas en el repositorio central y las reglas específicas en este archivo. La referencia requiere lectura explícita; no asumir herencia automática entre repositorios.
