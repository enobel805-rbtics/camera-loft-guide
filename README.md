# Camera Loft Guide

Open `index.html` in a browser. Keep the folder together: the pages share `guide.css`, `guide.js`, and `assets/`.

- `index.html`: concept, actual document context, and mount schematic.
- `profiles.html`: draw the foot profile and inspect/reuse Camera loft on the tilted plate.
- `loft.html`: interactive selection exercise and the actual Onshape procedure.
- `check.html`: connections comparison, troubleshooting, and final checks.
- `print.html`: all lessons in one printable page, with a Print / save PDF button.

No network is needed to read the guide. The Onshape document and official help links need internet access. Checkpoints are stored locally in the browser when local storage is available. The selection exercise is a teaching diagram, not a geometry solver.

The linked Drivetrain document was inspected on October 29, 2026. Camera loft was a sketch on Face of Extrude 3; Camera mount (9) was a feature folder; Camera mount was also a solid in the Parts list. Screenshots record that inspection. No CAD geometry was changed to make this guide.

The proposed exercise is a reinforcing loft between a foot profile and a profile on the tilted mount plate. All colored diagrams are schematic. Example dimensions are not measurements or a structural/manufacturing validation.

Regenerate the HTML and SVGs with `python build_guide.py`. CSS and JavaScript are authored separately. Screenshots live in `assets/`.

Official feature reference: https://cad.onshape.com/help/Content/PartStudio/loft.htm
