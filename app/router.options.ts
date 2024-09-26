import type { RouterConfig } from "nuxt/schema";

export default <RouterConfig>{
  scrollBehaviorType: "smooth",
  // scrollBehavior(to, from, savedPosition) {
  //   return new Promise((resolve, _reject) => {
  //     setTimeout(() => {
  //       if (savedPosition) {
  //         resolve(savedPosition);
  //       } else {
  //         if (to.hash) {
  //           resolve({
  //             el: to.hash,
  //             top: 0,
  //           });
  //         } else {
  //           resolve({ top: 0 });
  //         }
  //       }
  //     }, 100);
  //   });
  // },
};
