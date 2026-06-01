# Operación Gema

Una aventura gráfica **point-and-click** estilo LucasArts (look VGA 320×200,
interfaz SCUMM de 9 verbos, todo dibujado en código) sobre **Eneko**, alumno de
4º de la ESO en el colegio Corazonistas, que tiene que **ablandar a su profesora
Gema** para que el examen de mañana sea fácil... con la ayuda de su colega
**Unai** y un plan con mucha cara dura.

> Comedia escolar de ficción. Cualquier parecido con tu instituto es pura mala
> conciencia.

## Cómo se juega

Aventura clásica de hacer clic: elige un verbo (Mirar, Coger, Usar, Hablar
con, Dar...), haz clic en el escenario o en un personaje, y combina objetos del
inventario. El objetivo es resolver la cadena del puzzle:

```
Aula      → habla con Unai (te da el plan y el pendrive con el examen fácil)
          → coge la moneda del suelo
Pasillo   → mete la moneda en la máquina de café → coge el café
Sala de   → dale el café a Gema teniendo el pendrive en la mano:
profesores   mientras se distrae con el primer sorbo, haces el cambiazo. FIN.
```

El truco está en el final: necesitas **el café Y el pendrive a la vez**. Con uno
solo, Gema te pilla.

## Desarrollo

```bash
npm install
npm run dev      # juega en http://localhost:5173
npm run build    # build de producción en dist/
npx tsc --noEmit # type-check
```

### Estructura

- `src/config.ts` — título, música por sala, caja "Acerca de".
- `src/rooms/` — una sala por archivo (`aula`, `pasillo`, `sala`) + `index.ts`.
- `src/content/items.ts` — objetos del inventario (moneda, café, pendrive).
- `src/content/dialogues.ts` — árboles de diálogo de Unai y Gema.
- `src/art/actor.ts` — sprites de Eneko, Unai y Gema (pixel art en código).
- `src/screens/title.ts` — la portada (la fachada del cole al atardecer).
- `src/engine/`, `src/scumm/`, `src/audio/`, `src/main.ts` — el motor genérico.

Construido con [pointclick-kit](https://github.com/AngelJaimer/pointclick-adventure).

## Despliegue (GitHub Pages)

El repo incluye `.github/workflows/deploy.yml`: al hacer push a `main` construye
y publica en GitHub Pages, fijando la base path al nombre del repo
automáticamente. Activa Pages con *Source: GitHub Actions* y quedará en
`https://<usuario>.github.io/<repo>/`.

## Créditos y licencia

Código, arte y música originales. Homenaje *fan-made* al estilo SCUMM de
LucasArts, sin afiliación con Lucasfilm/Disney ni con ningún colegio real.
