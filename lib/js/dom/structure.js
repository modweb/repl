// The controls above the input panel
const btnReset = {
  tagName: 'button',
  className: 'btn-alt btn-reset js-btn-reset',
  textContent: 'Reset'
};

const btnShortUrl = {
  tagName: 'button',
  className: 'btn-alt btn-short-url js-btn-short-url',
  textContent: 'Make Short URL:'
};

const urlOut = {
  tagName: 'input',
  className: 'url-out js-url-out',
  attrs: {
    type: 'text'
  }
};

// The input panel
const inputPanel = {
  tagName: 'div',
  className: 'repl-panel repl-panel--input',
  children: [
    {
      tagName: 'h3',
      className: 'repl-title',
      textContent: 'Input'
    },
    {
      tagName: 'div',
      className: 'repl-panel-body',
      children: [
        {
          tagName: 'textarea',
          className: 'js-input'
        }
      ]
    }
  ]
};

// The output panel
const outputPanel = {
  tagName: 'div',
  className: 'repl-panel repl-panel--output',
  children: [
    {
      tagName: 'h3',
      className: 'repl-title',
      textContent: 'Output'
    },
    {
      tagName: 'button',
      className: 'repl-btn js-btn-clear',
      attrs: {
        type: 'button'
      },
      textContent: 'Clear Output'
    },
    {
      tagName: 'button',
      className: 'repl-btn js-btn-pretty',
      attrs: {
        type: 'button'
      },
      textContent: 'Pretty Output'
    },
    {
      tagName: 'div',
      className: 'repl-panel-body',
      children: [
        {
          tagName: 'pre',
          className: 'error js-error'
        },
        {
          tagName: 'pre',
          className: 'console-log js-console-log'
        },
        {
          tagName: 'textarea',
          className: 'js-output'
        }
      ]
    }
  ]
};

export default {
  tagName: 'div',
  children: [
    // The vertical line that splits the two panels
    {
      tagName: 'div',
      className: 'repl-midline'
    },
    {
      tagName: 'div',
      children: [
        btnReset,
        btnShortUrl,
        urlOut
      ]
    },
    {
      tagName: 'section',
      className: 'repl',
      children: [
        inputPanel,
        outputPanel
      ]
    }
  ]
}