import React from 'react';
import clsx from 'clsx';

type DocItemProps = {
  metadata: {
    previous?: {
      permalink: string;
      title: string;
    };
    next?: {
      permalink: string;
      title: string;
    };
  };
};

const DocItem: React.FC<DocItemProps> = ({ metadata }) => {
  const { previous, next } = metadata;

  return (
    <div className="custom-docitem">
      {previous && (
        <div className="custom-docitem-previous">
          <a href={previous.permalink}>上一篇：{previous.title}</a>
        </div>
      )}
      {next && (
        <div className="custom-docitem-next">
          <a href={next.permalink}>下一篇：2222222222{next.title}</a>
        </div>
      )}
    </div>
  );
};

export default DocItem;