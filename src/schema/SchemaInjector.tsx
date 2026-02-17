import React from 'react';

type Props = {
  data: unknown[];
};

export function SchemaInjector({ data }: Props) {
  return (
    <>
      {data.map((obj, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}
    </>
  );
}

export default SchemaInjector;
