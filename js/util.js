(function () {
  const KEYCODES = {
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39
  };

  window.util = {
    isLeftArrowEvt: function (evt) {
      return evt.altKey && evt.keyCode === KEYCODES.LEFT_ARROW;
    },

    isRightArrowEvt: function (evt) {
      return evt.altKey && evt.keyCode === KEYCODES.RIGHT_ARROW;
    }
  };
})();
