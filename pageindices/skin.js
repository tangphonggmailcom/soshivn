/* 
 * skin.js 5.0.0-1 Copyright (C) 2016 LOGOSWARE
 */
(function() {
  var skin;

  skin = new Vue({
    el: "#skin",
    data: {
      leftImageSource: 'images/arrowLeft.png',
      rightImageSource: 'images/arrowRight.png'
    },
    methods: {
      flipL: function() {
        return flipper.flipL();
      },
      flipR: function() {
        return flipper.flipR();
      }
    },
    computed: {
      visibilityFlipL: function() {
        if (flipper.enableFlipL) {
          return 'visible';
        } else {
          return 'hidden';
        }
      },
      visibilityFlipR: function() {
        if (flipper.enableFlipR) {
          return 'visible';
        } else {
          return 'hidden';
        }
      }
    },
    ready: function() {
      var el;
      flipper.$emit('init');
      el = document.getElementById('searchText');
      return this.$els.search.textContent = el.innerHTML;
    }
  });

}).call(this);
