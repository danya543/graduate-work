import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigator.userAgent || navigator.vendor || (window as any).opera;
    const mobileRegex =
      /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  return isMobile;
};
