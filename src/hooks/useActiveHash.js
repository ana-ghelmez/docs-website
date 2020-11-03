import { useEffect, useRef, useState } from 'react';
import getScrollHeight from '../utils/scrollHeight';
import { useWindowSize } from 'react-use';

const useActiveHash = (ids) => {
  const { height } = useWindowSize();
  const threshold = height * 0.3;
  const [activeHash, setActiveHash] = useState(
    () => window.location.hash || ids[0]
  );
  const activeHashRef = useRef(activeHash);

  useEffect(() => {
    const handler = () => {
      const elements = ids.map((id) => document.getElementById(id));
      const scrollTop = document.documentElement.scrollTop;
      const scrolledToBottom = scrollTop + height >= getScrollHeight();

      const element = scrolledToBottom
        ? elements[elements.length - 1]
        : findNearestHeading(elements, threshold);

      if (element && element.id !== activeHashRef.current) {
        setActiveHash(element.id);
        activeHashRef.current = element.idj;
      }
    };

    window.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => window.removeEventListener('scroll', handler);
  }, [ids, threshold, height]);

  return activeHash;
};

const findNearestHeading = (elements, offset) => {
  const scrollTop = document.documentElement.scrollTop;

  const hasCrossedThreshold = (element) =>
    element ? element.offsetTop - scrollTop <= offset : false;

  return elements.find((element, idx) => {
    if (!element) {
      return false;
    }

    if (idx === 0 && !hasCrossedThreshold(element)) {
      return true;
    }

    return (
      hasCrossedThreshold(element) && !hasCrossedThreshold(elements[idx + 1])
    );
  });
};

export default useActiveHash;
