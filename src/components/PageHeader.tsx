import React, { FC } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}
const PageHeader: FC<PageHeaderProps> = (props) => {
  const { title, description } = props;
  return (
    <div className="space-y-1 sm:space-y-2">
      <h1 className="text-xl sm:text-2xl lg:text-3xl text-primary font-bold">{title}</h1>
      {description && <p className="text-xs sm:text-sm lg:text-base text-[#706C6C]">{description}</p>}
    </div>
  );
};

export default PageHeader;
