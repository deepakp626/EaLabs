import { FC } from 'react';

type HeadingProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  textColor?: string;
};

const Heading: FC<HeadingProps> = ({ title, subtitle, align = 'center', textColor = 'text-gray-900' }) => {
  const alignment = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';
  return (
    <div className={`${alignment} my-8`}>
      <h2 className={`text-3xl md:text-4xl font-extrabold ${textColor}`}>{title}</h2>
      {subtitle && <p className={`mt-2 text-[20px] text-gray-600 ${textColor}`}>{subtitle}</p>}
    </div>
  );
};

export default Heading;

