import React, { FC } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
}
const PageHeader: FC<PageHeaderProps> = (props) => {
  const { title, description } = props;
  return (
    <div className="space-y-2">
      <h1 className="text-2xl text-primary font-bold">{title}</h1>
      <p className="text-sm text-[#706C6C]">{description}</p>
    </div>
  );
};

export default PageHeader;
