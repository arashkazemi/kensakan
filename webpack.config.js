/* 

  Kensakan
  A Tool for Stepping in Javascript Code without the Inspector

  Copyright (C) 2022 Arash Kazemi <contact.arash.kazemi@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

const path = require('path');
const fs = require('fs');

module.exports = {
  entry: './src/kensakan.js',
  mode: 'production',
  optimization: {
    //minimize: false,
  },
  output: {
    filename: 'kensakan.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Kensakan',
    libraryTarget: 'var',
    globalObject: 'this'
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('license-plugin', (compilation) => {
          fs.readFile('./dist/kensakan.min.js', 'utf8', function(err, jssc) {
            fs.readFile('./LICENSE', 'utf8', function(err, lsc) {
              let out=`/*\n${lsc}\n*/\n\n${jssc}\n`;
              fs.writeFile('./dist/kensakan.min.js', out, {}, function(){}); 
            });
          });

        });
      }
    }]
};