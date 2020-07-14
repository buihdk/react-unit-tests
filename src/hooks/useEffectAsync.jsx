import { useEffect } from 'react';

export default function useEffectAsync(effect, deps) {
  useEffect(() => {
    effect();
  }, deps);
}
