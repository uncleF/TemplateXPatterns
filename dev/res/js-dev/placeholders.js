/* global Modernizr */

import * as placeholders from 'patterns/tx-placeholders';

if (!Modernizr.input.placeholder) placeholders.init();
