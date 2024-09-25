import type { RouterConfig } from "nuxt/schema";

export default <RouterConfig>{
  scrollBehaviorType: "smooth",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
};
