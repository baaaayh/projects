"use strict";

$(function () {
  var search = {
    toggleSearch: function toggleSearch(e) {
      if ($(e.target).hasClass('active') && $('.main-section.active').attr('data-color') !== 'white') {
        $('.header').removeClass('white');
      } else {
        $('.header').addClass('white');
      }
    },
    init: function init() {
      var _this = this;
      $('#searchBtn').on('click', function (e) {
        return _this.toggleSearch(e);
      });
    }
  };
  return search.init();
});