import R from 'ramda';
import S from 'sanctuary';
import {Future} from 'ramda-fantasy';

const apiUrl = 'https://www.googleapis.com/urlshortener/v1/url?' +
    'key=AIzaSyDhbAvT5JqkxFPkoeezJp19-S_mAJudxyk';

const req = {
  longUrl: 'http://ramdajs.com/repl/'
};

const setValue = R.curry(function(urlOut, data) {
  urlOut.value = data;
  urlOut.select();
});

const error = err => console.error(err);

const xhr = function(url) {
  return new Future(function(reject, resolve) {
    const oReq = new XMLHttpRequest();
    const requestData = R.evolve({longUrl: R.concat(R.__, location.hash)}, req);

    oReq.addEventListener('load', resolve, false);
    oReq.addEventListener('error', reject, false);
    oReq.addEventListener('abort', reject, false);
    oReq.open('POST', url, true);
    oReq.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    oReq.send(JSON.stringify(requestData));
  });
};

const getResponse = R.compose(R.map(S.parseJson),
                            R.map(R.path(['target', 'responseText'])), xhr);

const getShortUrl = urlOut => R.map(R.compose(setValue(urlOut), R.prop('id')));

const futureXhr = getResponse(apiUrl);

export default function bindShortUrlButton(options) {

  options.btnMakeShortUrl.addEventListener('click', function() {
    futureXhr.fork(error, getShortUrl(options.urlOut));
  });

}
