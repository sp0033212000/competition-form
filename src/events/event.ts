import EE from "eventemitter3";

export const event = new EE();

export const loadingEventEmitter = {
  on: (fn: (isLoading: boolean) => void) => event.on("loading", fn),
  off: (fn: (isLoading: boolean) => void) => event.off("loading", fn),
  emit: (isLoading: boolean) => event.emit("loading", isLoading),
};
