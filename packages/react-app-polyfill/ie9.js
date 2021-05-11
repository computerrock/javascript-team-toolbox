'use strict';

require('./ie11');

// React 16+ relies on Map, Set, and requestAnimationFrame
require('core-js/features/map');
require('core-js/features/set');

require('raf').polyfill();
