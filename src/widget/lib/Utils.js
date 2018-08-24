export default {

  dpr() {
    (function (e, l) {
      var c,
        k,
        d,
        f = e.document,
        g = f.documentElement,
        h = l.flexible || (l.flexible = {});
      (function () {
        var a,
          b = f.querySelector('meta[name="viewport"]');
        c = e.devicePixelRatio || 1;
        a = 1;
        g.setAttribute("data-dpr", 0);
        a =
          "width=device-width, initial-scale=" +
          a +
          ", minimum-scale=" +
          a +
          ", maximum-scale=" +
          a +
          ", user-scalable=no";
        b
          ?
          b.setAttribute("content", a) :
          ((b = f.createElement("meta")),
            b.setAttribute("name", "viewport"),
            b.setAttribute("content", a),
            (f.head || g.firstElementChild).appendChild(b));
      })();
    })(window, window.FT || (window.FT = {}));
  }

}
