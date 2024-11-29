import React, {PropsWithChildren, useEffect, useState} from 'react';

export default function DeferredComponent({children}: PropsWithChildren<{}>) {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    // 200ms 지난 후 children Render
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
}
