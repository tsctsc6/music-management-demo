// navigation.ts
import type { NavigateFunction } from "react-router-dom";

let navigator: NavigateFunction | null = null;

export function setNavigator(nav: NavigateFunction) {
  navigator = nav;
}

export function navigateToLogin() {
  if (navigator) {
    // replace: true 不会新增历史记录
    navigator("/login", { replace: true });
  } else {
    console.warn("Navigator not initialized yet.");
  }
}
