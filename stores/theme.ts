export const useThemeStore = defineStore("theme", () => {
  const isSidebarOpen = ref(false);
  const toggleSidebar = () => (isSidebarOpen.value = !isSidebarOpen.value);

  return { isSidebarOpen, toggleSidebar };
});
