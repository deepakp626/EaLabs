import { FC } from 'react';

type HeadingProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
};

const Heading: FC<HeadingProps> = ({ title, subtitle, align = 'center' }) => {
  const alignment = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  return (
    <div className={`${alignment} my-8`}>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default Heading; // TS component
