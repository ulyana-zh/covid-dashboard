const keyboard = {
  constainer: null,
  sideKeys: [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '|', 'Backspace'],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', 'Delete'],
    ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
    ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Up', 'Shift'],
    ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl'],
  ],
  mainKeys: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '\\', null],
    [null, 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', null],
    [null, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', null],
    [null, 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', null],
  ],
  sideKeysRus: [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '/', null],
    [null, 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', null],
    [null, 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', null],
    [null, 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', null],
  ],
  mainKeysRus: [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '\\', null],
    [null, 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', null],
    [null, 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', null],
    [null, 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', null],
  ],
  textarea: null,
  buttonLanguage: null,
  shiftActive: false,
  languageEnglish: true,
  capslock: null,
  switchKeyboard: null,

  init() {
    this.constainer = document.querySelector('.list__wrapper');
    const keyboardDiv = document.createElement('div');
    keyboardDiv.classList.add('keyboard', 'keyboard-off');
    keyboardDiv.setAttribute('draggable', true);
    keyboardDiv.innerHTML = `<div class="close-keyboard">
      <img src="assets/close.png">
    </div>`;
    for (let i = 0; i < this.sideKeys.length; i += 1) {
      const row = document.createElement('div');
      switch (i) {
        case 0:
          row.classList.add('keyboard__row-first');
          break;
        case 1:
          row.classList.add('keyboard__row-second');
          break;
        case 2:
          row.classList.add('keyboard__row-third');
          break;
        case 3:
          row.classList.add('keyboard__row-fourth');
          break;
        case 4:
          row.classList.add('keyboard__row-fifth');
          break;
        default:
      }

      for (let j = 0; j < this.sideKeys[i].length; j += 1) {
        if (this.sideKeys[i][j].length === 1) {
          const key = document.createElement('div');
          key.classList.add('key');

          const spanSide = document.createElement('span');
          spanSide.classList.add('side-key');

          const spanMain = document.createElement('span');
          spanMain.classList.add('main-key');

          const spanSideRus = document.createElement('span');
          spanSideRus.classList.add('side-key-rus', 'disabled');

          const spanMainRus = document.createElement('span');
          spanMainRus.classList.add('main-key-rus', 'disabled');

          spanSide.innerText = this.sideKeys[i][j];
          spanMain.innerText = this.mainKeys[i][j];
          spanSideRus.innerText = this.sideKeysRus[i][j];
          spanMainRus.innerText = this.mainKeysRus[i][j];

          key.appendChild(spanSide);
          key.appendChild(spanMain);
          key.appendChild(spanSideRus);
          key.appendChild(spanMainRus);

          row.appendChild(key);
        } else {
          const key = document.createElement('div');
          key.classList.add('key');
          key.classList.add(`${this.sideKeys[i][j].toLowerCase()}`);
          const span = document.createElement('span');

          span.innerText = this.sideKeys[i][j];
          key.appendChild(span);
          row.appendChild(key);
        }
      }
      keyboardDiv.appendChild(row);
    }

    this.textarea = document.querySelector('.search-input');

    this.constainer.appendChild(keyboardDiv);
    // create language button
    this.buttonLanguage = document.querySelector('.key.win');
    const spanRus = document.createElement('span');
    spanRus.classList.add('language-side');
    spanRus.innerText = 'Ru';

    const span = document.createElement('span');
    span.classList.add('language');
    span.innerText = 'En';

    this.buttonLanguage.appendChild(spanRus);
    this.buttonLanguage.appendChild(span);

    // add event listener to keys
    const keys = document.querySelectorAll('.key');
    this.capslock = document.querySelector('.key.capslock');

    keys.forEach((key) => {
      key.addEventListener('click', (event) => {
        switch (event.target.innerText) {
          case 'Ru':
          case 'En':
          case 'Win':
            this.changeLanguage();
            if (this.languageEnglish) {
              this.languageEnglish = false;
            } else {
              this.languageEnglish = true;
            }
            break;
          case 'Tab':
            this.textarea.setRangeText('    ', this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
            this.textarea.focus();
            break;
          case 'Backspace':
            this.backspace();
            break;
          case 'Delete':
            this.deleteButton();
            break;
          case 'CapsLock':
            this.shift();
            this.capslock.classList.toggle('active');
            break;
          case 'Enter':
            this.textarea.setRangeText('\n', this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
            this.textarea.focus();
            break;
          case 'Shift':
            this.shift();
            keys[42].classList.toggle('active');
            keys[54].classList.toggle('active');
            if (keys[42].classList.contains('active') && keys[54].classList.contains('active')) {
              this.shiftActive = true;
            } else {
              this.shiftActive = false;
            }
            break;
          case 'Ctrl':
            break;
          case 'Alt':
            break;
          case 'Space':
            this.textarea.setRangeText(' ', this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
            this.textarea.focus();
            break;
          case 'Left':
            this.left();
            break;
          case 'Right':
            this.right();
            break;
          case 'Up':
            this.up();
            break;
          case 'Down':
            this.down();
            break;
          default:
            if (this.languageEnglish) {
              const spanCurrent = key.querySelector('.main-key');
              this.textarea.setRangeText(spanCurrent.innerText, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
              this.textarea.focus();
            } else {
              const spanCurrent = key.querySelector('.main-key-rus');
              this.textarea.setRangeText(spanCurrent.innerText, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
              this.textarea.focus();
            }

            if (this.shiftActive) {
              this.shift();
              this.shiftActive = false;
              keys[42].classList.toggle('active');
              keys[54].classList.toggle('active');
            }
            break;
        }
      });
    });
    this.switchKeyboard = document.querySelector('.keyboard-icon');
    this.switchKeyboard.addEventListener('click', () => {
      keyboardDiv.classList.toggle('keyboard-off');
    });
    document.querySelector('.close-keyboard > img').addEventListener('click', () => {
      keyboardDiv.classList.add('keyboard-off');
    });
    this.dragAndDrop(keyboardDiv);
  },

  changeLanguage() {
    const sideKeysCurrent = document.querySelectorAll('.side-key');
    const mainKeysCurrent = document.querySelectorAll('.main-key');
    const sideKeysRusCurrent = document.querySelectorAll('.side-key-rus');
    const mainKeysRusCurrent = document.querySelectorAll('.main-key-rus');

    const language = document.querySelector('.language');
    const languageSide = document.querySelector('.language-side');
    const temp = language.innerText;
    language.innerText = languageSide.innerText;
    languageSide.innerText = temp;

    for (let i = 0; i < sideKeysCurrent.length; i += 1) {
      sideKeysCurrent[i].classList.toggle('disabled');
      mainKeysCurrent[i].classList.toggle('disabled');
      sideKeysRusCurrent[i].classList.toggle('disabled');
      mainKeysRusCurrent[i].classList.toggle('disabled');
    }
  },

  backspace() {
    const firstString = this.textarea.value.slice(0, this.textarea.selectionStart);
    const secondString = this.textarea.value.slice(this.textarea.selectionEnd);
    const positionFocus = this.textarea.selectionStart;

    this.textarea.value = firstString.slice(0, -1) + secondString;
    this.textarea.focus();
    if (positionFocus > 0) {
      this.textarea.setSelectionRange(positionFocus - 1, positionFocus - 1);
    } else {
      this.textarea.setSelectionRange(positionFocus, positionFocus);
    }
  },

  deleteButton() {
    const firstString = this.textarea.value.slice(0, this.textarea.selectionStart);
    const secondString = this.textarea.value.slice(this.textarea.selectionEnd);
    const positionFocus = this.textarea.selectionStart;

    this.textarea.value = firstString + secondString.slice(1);
    this.textarea.focus();
    if (positionFocus < this.textarea.value.length) {
      this.textarea.setSelectionRange(positionFocus, positionFocus);
    } else {
      this.textarea.setSelectionRange(positionFocus, positionFocus);
    }
  },

  shift() {
    const keysCurrent = document.querySelectorAll('.key');
    keysCurrent.forEach((key) => {
      if (key.querySelector('.side-key')) {
        const sideKey = key.querySelector('.side-key');
        const mainKey = key.querySelector('.main-key');
        const sideKeyRus = key.querySelector('.side-key-rus');
        const mainKeyRus = key.querySelector('.main-key-rus');

        const temp = mainKey.innerHTML;
        const tempRus = mainKeyRus.innerHTML;

        mainKey.innerHTML = sideKey.innerHTML;
        sideKey.innerHTML = temp;

        mainKeyRus.innerHTML = sideKeyRus.innerHTML;
        sideKeyRus.innerHTML = tempRus;
      }
    });
  },

  left() {
    const positionFocus = this.textarea.selectionStart;

    this.textarea.focus();
    if (positionFocus > 0) {
      this.textarea.setSelectionRange(positionFocus - 1, positionFocus - 1);
    } else {
      this.textarea.setSelectionRange(positionFocus, positionFocus);
    }
  },

  right() {
    const positionFocus = this.textarea.selectionStart;

    this.textarea.focus();
    if (positionFocus < this.textarea.value.length) {
      this.textarea.setSelectionRange(positionFocus + 1, positionFocus + 1);
    } else {
      this.textarea.setSelectionRange(positionFocus, positionFocus);
    }
  },

  up() {
    const positionFocus = this.textarea.selectionStart;

    this.textarea.focus();
    if (positionFocus > 0) {
      const count = this.textarea.value.slice(0, this.textarea.selectionStart).length;
      this.textarea.setSelectionRange(positionFocus - count, positionFocus - count);
    } else {
      this.textarea.setSelectionRange(positionFocus, positionFocus);
    }
  },

  down() {
    const positionFocus = this.textarea.selectionStart;

    this.textarea.focus();
    if (positionFocus < this.textarea.value.length) {
      const count = this.textarea.value.slice(this.textarea.selectionEnd).length;
      this.textarea.setSelectionRange(positionFocus + count, positionFocus + count);
    } else {
      this.textarea.setSelectionRange(positionFocus, positionFocus);
    }
  },

  dragAndDrop(element) {
    function dragStart(event) {
      setTimeout(() => {
        element.classList.add('keyboard-off');
      }, 0);
      const style = window.getComputedStyle(event.target, null);
      event.dataTransfer.setData('text/plain',
        `${parseInt(style.getPropertyValue('left'), 10) - event.clientX},${parseInt(style.getPropertyValue('top'), 10) - event.clientY}`);
    }

    function dragOver(event) {
      event.preventDefault();
      return false;
    }

    function drop(event) {
      const offset = event.dataTransfer.getData('text/plain').split(',');
      const keyboardCurrent = document.querySelector('.keyboard');
      keyboardCurrent.style.left = `${event.clientX + parseInt(offset[0], 10)}px`;
      keyboardCurrent.style.top = `${event.clientY + parseInt(offset[1], 10)}px`;
      event.preventDefault();
      return false;
    }

    element.addEventListener('dragstart', dragStart, false);
    element.addEventListener('dragend', () => {
      element.classList.remove('keyboard-off');
    });
    document.body.addEventListener('dragover', dragOver, false);
    document.body.addEventListener('drop', drop, false);
  },

  // dragAndDrop(elmnt) {
  //   let pos1 = 0;
  //   let pos2 = 0;
  //   let pos3 = 0;
  //   let pos4 = 0;
  //   function dragMouseDown(e) {
  //     e = e || window.event;
  //     pos3 = e.clientX;
  //     pos4 = e.clientY;
  //     document.addEventListener('mouseup', closeDragElement);
  //     document.addEventListener('mousemove', elementDrag);
  //   }

  //   function elementDrag(e) {
  //     // e = e || window.event;
  //     console.log(e.clientX)
  //     pos1 = pos3 - e.clientX;
  //     pos2 = pos4 - e.clientY;
  //     pos3 = e.clientX;
  //     pos4 = e.clientY;
  //     elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
  //     elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
  //   }

  //   function closeDragElement() {
  //     document.removeEventListener('mouseup', closeDragElement);
  //     document.removeEventListener('mousemove', elementDrag);
  //   }

  //   elmnt.addEventListener('mousedown', dragMouseDown);
  // },
};

keyboard.init();
