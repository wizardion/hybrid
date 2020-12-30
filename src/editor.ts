class Editor {
  private $element: HTMLElement;
  private $text: String;
  private $caret: HTMLElement;
  private $codes: HTMLElement;

  constructor(element: HTMLElement, init: Boolean = false) {
    this.$element = element;
    this.$text = '';

    if (init) {
      this.init();
    }
  }

  init() {
    this.$element.setAttribute('contenteditable', 'true');
    this.$element.setAttribute('tabIndex', '-1');

    this.$element.addEventListener('keydown', this.$onkeyDown.bind(this));
    document.addEventListener('paste', this.$onPaste.bind(this));

    // editor.element.addEventListener('focusin', onFocus);
    // editor.element.addEventListener('focusout', onBlur);

    this.$caret = document.createElement('div');
    this.$caret.classList.add('caret');

    this.$codes = document.createElement('div');
    this.$codes.classList.add('editor-code');

    this.$element.appendChild(this.$caret);
    this.$element.appendChild(this.$codes);
  }

  $onkeyDown(e: KeyboardEvent) {
    if (!(e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
      e.preventDefault();

      this.$text = this.$text.slice(0, -1);
      return this.$render();
    }

    if (!(e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      
      this.$text += '\n';
      return this.$render();
    }

    if (!(e.ctrlKey || e.metaKey) && e.key.length === 1) {
      e.preventDefault();

      this.$text += e.key;
      return this.$render();
    }
  }

  $onPaste(e: ClipboardEvent) {
    if (document.activeElement === this.$element) {
      console.log(e);

      var clipboard = e.clipboardData;
      var text = clipboard.getData('text/plain');

      e.preventDefault();

      this.$text += text;
      this.$render();

      // this.$element.scrollTop = this.$element.scrollHeight;
    }
  }

  $render() {
    let lines = this.$text.split('\n');
    let codeSpan, codeLine;

    let last = this.$codes.childNodes[lines.length - 1];

    if (last) {
      let line = lines[lines.length - 1] || '&#8203';
      codeSpan = <HTMLElement> last.childNodes[0];
      codeSpan.innerHTML = line;
    } else {
      this.$codes.innerHTML = '';

      for (let index = 0; index < lines.length; index++) {
        const line = lines[index] || '&#8203';
        codeLine = <HTMLElement>  document.createElement('pre');
        codeSpan = <HTMLElement>document.createElement('span');

        codeLine.classList.add('editor-line');
        codeSpan.classList.add('editor-span');

        codeSpan.innerHTML = line;

        codeLine.appendChild(codeSpan);
        this.$codes.appendChild(codeLine);
      }
    }

    this.$renderCaret(codeSpan.offsetLeft + codeSpan.offsetWidth, codeSpan.offsetTop, codeSpan.offsetHeight);
  }

  $renderCaret(x: Number, y: Number, h: Number) {
    this.$caret.style.left = `${x}px`;
    this.$caret.style.top = `${y}px`;
    this.$caret.style.height = `${h}px`;
  }
}

export default Editor;