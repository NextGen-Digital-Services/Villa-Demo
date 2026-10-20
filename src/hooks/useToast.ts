"use client";

import { useState, useEffect } from "react";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: "success" | "error" | "info" | "warning";
}

let listeners: ((toasts: ToastMessage[]) => void)[] = [];
let memoryToasts: ToastMessage[] = [];

function notifyListeners() {
  listeners.forEach((listener) => listener([...memoryToasts]));
}

export function showToast(
  title: string,
  description?: string,
  type: "success" | "error" | "info" | "warning" = "success"
) {
  const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
  const newToast: ToastMessage = { id, title, description, type };
  memoryToasts = [newToast, ...memoryToasts].slice(0, 4);
  notifyListeners();

  setTimeout(() => {
    memoryToasts = memoryToasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 4500);
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>(memoryToasts);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  const dismiss = (id: string) => {
    memoryToasts = memoryToasts.filter((t) => t.id !== id);
    notifyListeners();
  };

  return { toasts, showToast, dismiss };
}
