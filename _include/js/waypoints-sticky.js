/*
Sticky Elements Shortcut for jQuery Waypoints - v2.0.2
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {

  (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      return define(['jquery', 'waypoints'], factory);
    } else {
      return factory(root.jQuery);
    }
  })(this, function($) {
    var defaults, wrap;
    defaults = {
      wrapper: '<div class="sticky-wrapper" style="position: absolute;" />',
      stuckClass: 'stuck'
    };
    wrap = function($elements, options) {
      $elements.wrap(options.wrapper);
      $elements.each(function() {
        var $this;
        $this = $(this);
        $this.parent().height($this.outerHeight());
        return true;
      });
      return $elements.parent();
    };
    return $.waypoints('extendFn', 'sticky', function(options) {
      var $wrap, originalHandler;
      options = $.extend({}, $.fn.waypoint.defaults, defaults, options);
      $wrap = wrap(this, options);
      originalHandler = options.handler;
      options.handler = function(direction) {
        var $sticky, shouldBeStuck;
        $sticky = $(this).children(':first');
        shouldBeStuck = direction === 'down' || direction === 'right';
        $sticky.toggleClass(options.stuckClass, shouldBeStuck);
        if (originalHandler != null) {
          return originalHandler.call(this, direction);
        }
      };
      $wrap.waypoint(options);
      return this;
    });
  });

}).call(this);


