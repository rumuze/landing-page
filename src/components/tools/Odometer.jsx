import React from 'react';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * A number whose digits roll to their new value. Each digit column is keyed by its place from
 * the right, so a column keeps its identity when the number grows or shrinks and the digits that
 * stay the same do not move. The text is also present once for screen readers.
 */
const Odometer = ({ value }) => {
  const chars = String(value).split('');
  return (
    <span className="odo">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="odo">
        {chars.map((char, index) => {
          const place = chars.length - index;
          if (!/\d/.test(char)) return <span key={`s${place}`}>{char}</span>;
          return (
            <span className="odo-col" key={`d${place}`}>
              <span className="odo-strip" style={{ transform: `translateY(-${Number(char)}em)` }}>
                {DIGITS.map((digit) => (
                  <span key={digit}>{digit}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default Odometer;
