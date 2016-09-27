/* globals URI */
import es2015 from 'babel-preset-es2015';
import stage0 from 'babel-preset-stage-0';
import R from 'ramda';
import debounce from 'debounce';
import codeMirrorConfig from '../code-mirror-config.json';

const babel = require('babel-core');

const inputConfig = R.merge(codeMirrorConfig, {
  lineNumbers : true,
  extraKeys: {
    Tab: 'autocomplete'
  },
  autofocus: true,
  autoCloseBrackets: true,
  historyEventDelay: 2000
});

const transformConfig = {
  filename: 'ramda',
  presets: [
    es2015,
    stage0
  ]
};

const ramdaStr = `const {${R.keys(R).join(',')}} = R;`;
const evalSource = R.compose(R.toString, eval); // eslint-disable-line no-eval

const formatCode = code => evalSource(code)
                              .replace('"use strict"', '')


const test = (formattedCode, options) => {
  if (options.passingOutput) {
    const uri = new URI(window.location);
    const uriMap = uri.search(true);
    const passingState = URI.decode(uriMap.passingState);
    options.passingOutput.innerHTML = 'Passing? ' + R.equals(formattedCode, passingState);
  }
};

const formatError = err => err.message
                              .replace(ramdaStr, '')
                              .replace(/(?=\d).*(?=\|)/g, a => Number(a.trim()) - 1);

function compile(input, options) {

  const source = input.getValue();
  const code = `${ramdaStr} \n${source}`;

  if (typeof options.onChange === 'function') {
    options.onChange(source, options.passingState);
  }

  options.evalError.textContent = '';

  try {

    const transformed = babel.transform(code, transformConfig);
    const formattedCode = formatCode(transformed.code);
    options.output.setValue(formattedCode);
    test(formattedCode, options);
  } catch (err) {

    options.evalError.textContent = formatError(err);

  }

}
const debounceCompile = delay => debounce(compile, delay);

export default function bindInputPanel(options) {

  const input = CodeMirror.fromTextArea(options.input, inputConfig);
  const onChange = debounceCompile(options.delay);
  // console.log(options.passingOutput);

  input.on('change', () => onChange(input, options));

  if (options.initialValue) {
    input.setValue(options.initialValue);
  }

  return input;

}
