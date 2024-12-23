// const limitInCache = (key, size) => {
//   caches.open(key).then((cache) => {
//     cache.keys().then((keys) => {
//       if (keys.length > size) {
//         cache.delete(keys[0]).then(limitInCache(key, size));
//       }
//     });
//   });
// };

// const cacheVersion = 3;

// const activeCaches = {
//   static: `static-v${cacheVersion}`,
//   dynamic: `dynamic-v${cacheVersion}`,
// };

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(activeCaches["static"]).then((cache) => {
//       cache.addAll([
//         "/",
//         "/fallback.html",
//         "js/script.js",
//         "js/app.js",
//         "js/code.js",
//         "css/style.css",
//       ]);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   const activeCacheNames = Object.values(activeCaches);
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.forEach((cacheName) => {
//           if (!activeCacheNames.includes(cacheName)) {
//             return caches.delete(cacheName); // :))
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   // 1. First Cache, second network

//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response;
//       } else {
//         return fetch(event.request)
//           .then((serverResponse) => {
//             return caches.open([activeCaches["dynamic"]]).then((cache) => {
//               cache.put(event.request, serverResponse.clone());
//               // limitInCache(activeCaches["dynamic"], 18);
//               return serverResponse;
//             });
//           })
//           .catch((err) => {
//             console.log(err);

//             return caches.match("/fallback.html");
//           });
//       }
//     })
//   );

//   // 2. Network Only
//   // event.respondWith(fetch(event.request));

//   // 3. Cache Only
//   // event.respondWith(caches.match(event.request));

//   // 4. First Network, second Cache
//   // return event.respondWith(
//   //   fetch(event.request)
//   //     .then((response) => {
//   //       return caches.open(activeCaches["dynamic"]).then((cache) => {
//   //         cache.put(event.request, response.clone());
//   //         return response;
//   //       });
//   //     })
//   //     .catch((err) => {
//   //       return caches.match(event.request);
//   //     })
//   // );
// });

// self.addEventListener("sync", (event) => {
//   if (event.tag === "add-course") {
//     addCourse();
//   }
// });

// const addCourse = async () => {};

const CACHE_NAME = "version-1";
const urlsCache = ["/index.html", "offline.html"];

// Insatll the SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
