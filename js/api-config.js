          (function (w, d, t, f) {
            w[f] = w[f] || function (c, k, n) {
              s = w[f], k = s['k'] = (s['k'] || (k ? ('&k=' + k) : '')); s['c'] =
                c = (c instanceof Array) ? c : [c]; s['n'] = n = n || 0; L = d.createElement(t), e = d.getElementsByTagName(t)[0];
              L.async = 1; L.src = '//feed.aqicn.org/feed/' + (c[n].city) + '/' + (c[n].lang || '') + '/feed.v1.js?n=' + n + k;
              e.parentNode.insertBefore(L, e);
            };
          })(window, document, 'script', '_aqiFeed');
          const form = document.getElementById('city-search-form');
          const input = document.getElementById('city-input');
          const containerId = 'city-aqi-container';

          function formatCityName(city) {
            return city.trim().toLowerCase().replace(/\s+/g, '-');
          }

          function clearPreviousWidget() {
            const container = document.getElementById(containerId);
            container.innerHTML = '';

            const scripts = document.querySelectorAll('script[src*="feed.aqicn.org/feed/"]');
            scripts.forEach(script => script.remove());
          }

          form.addEventListener('submit', function (e) {
            e.preventDefault();

            const city = formatCityName(input.value);
            if (!city) return;

            clearPreviousWidget();

            _aqiFeed({container: containerId, city: city });
          });