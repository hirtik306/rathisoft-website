/**
 * ============================================================
 * RATHISOFT — Header & Footer Loader
 * header-footer-loader.js
 *
 * This script fetches header.html and footer.html and injects
 * them into every page that includes this script.
 *
 * How it works:
 *   - Place <div id="site-header"></div> where the nav should go
 *   - Place <div id="site-footer"></div> where the footer should go
 *   - Include this script at the bottom of <body>
 *
 * Works on:
 *   ✅ VS Code Live Server (localhost)
 *   ✅ GitHub Pages (https)
 *   ✅ Any static hosting (Netlify, Vercel, etc.)
 * ============================================================
 */

(function () {
  'use strict';

  /**
   * Fetch an HTML partial and inject it into a target element.
   * @param {string} url      - Path to the HTML partial (e.g. 'header.html')
   * @param {string} targetId - ID of the container element to inject into
   * @param {Function} [cb]   - Optional callback fired after injection
   */
  function loadPartial(url, targetId, cb) {
    var target = document.getElementById(targetId);
    if (!target) return; // container not found on this page — skip

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('Could not load ' + url + ' (' + res.status + ')');
        return res.text();
      })
      .then(function (html) {
        target.innerHTML = html;
        // Re-run any <script> tags inside the injected HTML
        var scripts = target.querySelectorAll('script');
        scripts.forEach(function (oldScript) {
          var newScript = document.createElement('script');
          Array.from(oldScript.attributes).forEach(function (attr) {
            newScript.setAttribute(attr.name, attr.value);
          });
          newScript.textContent = oldScript.textContent;
          oldScript.parentNode.replaceChild(newScript, oldScript);
        });
        if (typeof cb === 'function') cb();
      })
      .catch(function (err) {
        console.warn('[Rathisoft Loader]', err.message);
      });
  }

  // Load header then footer
  loadPartial('header.html', 'site-header');
  loadPartial('footer.html', 'site-footer');
}());
