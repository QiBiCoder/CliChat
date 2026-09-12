import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        trust: true,
      });
    } catch {
      return `<span class="font-mono text-indigo-400">${math}</span>`;
    }
  }, [math, block]);

  return (
    <span
      className={`inline-block ${block ? 'my-2 w-full text-center overflow-x-auto py-1' : 'align-middle'} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
