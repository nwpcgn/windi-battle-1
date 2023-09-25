import storage from "../util/storage";
import { writable } from "svelte/store";

export const _user = writable(null);
export const _settings = storage("nwp_settings", {
  titel: null,
  app_name: "Savage Submarine Legend",
  user_name: null,
  op: {
    auto_save: false,
    delay: 4000,
    volume: 0.2,
  },
});
export const _store = storage("nwp_store", {});
export const _daten = writable({});
export const _views = writable({});
export const _currentView = writable("root");
