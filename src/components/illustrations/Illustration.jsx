import React from 'react';
import { SCENES } from './scenes.generated';

/**
 * A decorative isometric scene in the site palette. Inline SVG, so it follows the
 * light and dark theme without extra requests. The scene is hidden from assistive
 * technology: the text beside it carries the meaning.
 */
const Illustration = ({ scene, className = '' }) => {
  const art = SCENES[scene];
  if (!art) return null;

  return (
    <div className={`ill-frame ${className}`} aria-hidden="true">
      <svg
        className="ill"
        dangerouslySetInnerHTML={{ __html: art.body }}
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        viewBox={art.viewBox}
      />
    </div>
  );
};

export default Illustration;
