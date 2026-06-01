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
Aula      → Unai te explica el PLAN (café + cambiazo de examen)
          → Blanca te dará su pendrive con el examen fácil... si le traes
            la partitura de la canción de Pantxo
Pasillo   → Pantxo te da la partitura si le halagas el canto
          → la máquina de café necesita una moneda → café
Gimnasio  → Alfonso ("el que lo intenta tiene un 5"): intenta el ejercicio
            en las espalderas y podrás coger la moneda del suelo
Sala de   → dale el café a Gema teniendo el pendrive en la mano:
profesores   mientras se distrae con el primer sorbo, haces el cambiazo. FIN.
```

El examen es de **naturales: el suelo sedimentario**. El truco final: necesitas
**el café Y el pendrive a la vez**. Con uno solo, Gema te pilla.

### Personajes

- **Eneko** — protagonista, 4º de la ESO, cara dura nivel experto.
- **Unai** — su colega, el cerebro del plan.
- **Blanca** — la más lista de clase; tiene el examen fácil.
- **Pantxo** — profe enamorado de su propia voz; guarda la partitura.
- **Alfonso** — profe de gimnasia; sin sudar no hay moneda.
- **Gema** — la profe de naturales a la que hay que ablandar.

## Desarrollo

```bash
npm install
npm run dev      # juega en http://localhost:5173
npm run build    # build de producción en dist/
npx tsc --noEmit # type-check
```

### Estructura

- `src/config.ts` — título, música por sala, caja "Acerca de".
- `src/rooms/` — una sala por archivo (`aula`, `pasillo`, `gimnasio`, `sala`) + `index.ts`.
- `src/content/items.ts` — objetos del inventario (moneda, café, pendrive, partitura).
- `src/content/dialogues.ts` — árboles de diálogo de Unai, Blanca, Pantxo, Alfonso y Gema.
- `src/art/actor.ts` — sprites de Eneko, Unai, Blanca, Pantxo, Alfonso y Gema (pixel art en código).
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
