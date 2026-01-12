import { useEffect, useMemo, useState } from 'react';

const assetExistenceCache = new Map<string, boolean>();

async function checkAssetExists(url: string, signal: AbortSignal): Promise<boolean> {
  const cached = assetExistenceCache.get(url);
  if (cached !== undefined) return cached;

  try {
    const head = await fetch(url, { method: 'HEAD', signal });
    const ok = head.ok;
    assetExistenceCache.set(url, ok);
    return ok;
  } catch {
    // Some static servers don’t support HEAD; fall back to a tiny GET.
    try {
      const get = await fetch(url, {
        method: 'GET',
        headers: { Range: 'bytes=0-0' },
        signal,
      });
      const ok = get.status === 206 || (get.status >= 200 && get.status < 400);
      assetExistenceCache.set(url, ok);
      return ok;
    } catch {
      assetExistenceCache.set(url, false);
      return false;
    }
  }
}

export function useAssetsExist(urls: string[]) {
  const key = useMemo(() => urls.filter(Boolean).sort().join('|'), [urls]);
  const [state, setState] = useState<{ ready: boolean; allExist: boolean }>({ ready: false, allExist: false });

  useEffect(() => {
    const normalized = urls.filter(Boolean);
    if (normalized.length === 0) {
      setState({ ready: true, allExist: false });
      return;
    }

    const controller = new AbortController();

    (async () => {
      try {
        const results = await Promise.all(normalized.map((u) => checkAssetExists(u, controller.signal)));
        setState({ ready: true, allExist: results.every(Boolean) });
      } catch {
        setState({ ready: true, allExist: false });
      }
    })();

    return () => controller.abort();
  }, [key, urls]);

  return state;
}
