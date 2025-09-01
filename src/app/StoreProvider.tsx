// app/StoreProvider.tsx
'use client'; // This directive marks it as a client component

import { useRef } from 'react';
import { Provider } from 'react-redux';
// import { makeStore, AppStore } from '@/lib/store';
import { makeStore, AppStore } from '@/store/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
   const storeRef = useRef<AppStore | null>(null); // 👈 fix
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}