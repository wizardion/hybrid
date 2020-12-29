class Editor {
  private $element;

  constructor(element: HTMLElement, init: Boolean = false) {
    this.$element = element;

    if (init) {
      this.init();
    }
  }

  init() {
    this.$element.setAttribute('contenteditable', 'true');
    this.$element.setAttribute('tabIndex', '-1');
  }

}

export default Editor;