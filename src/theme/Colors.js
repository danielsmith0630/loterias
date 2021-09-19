import CONFIG from '../config';

import colorsYellow from './ColorsYellow';
import colorsOrange from './ColorsOrange';
import colorsRed from './ColorsRed';
import colorsGreen from './ColorsGreen';
import colorsBlue from './ColorsBlue';
import colorsBlue1 from './ColorsBlue1';

let colorsTable = null;
const theme = CONFIG.VIEW_OPTIONS.THEME;
switch (theme) {
  case 'yellow':
    colorsTable = colorsYellow;
    break;
  case 'orange':
    colorsTable = colorsOrange;
    break;
  case 'red':
    colorsTable = colorsRed;
    break;
  case 'green':
    colorsTable = colorsGreen;
    break;
  case 'blue':
    colorsTable = colorsBlue;
    break;
  case 'blue1':
  default:
    colorsTable = colorsBlue1;
    break;
}

const colors = colorsTable;
export default colors;
