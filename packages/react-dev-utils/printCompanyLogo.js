'use strict';

const chalk = require('chalk');

module.exports = function printCompanyLogo() {
    console.log(chalk`{cyan
    
                    /\\
                   /|/\\
              /\\  /||| \\
             /|\\\\/ \\  \\ \\
            //| ||\\ | /||\\
           /| |||\\ \\| || \\\\
          /_/_/||||||/|||||\\

        C  O  M  P  U  T  E  R
              R  O  C  K
              
    }`);
};
