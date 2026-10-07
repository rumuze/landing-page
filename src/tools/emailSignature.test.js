import { describe, expect, it } from 'vitest';
import {
  EXAMPLE,
  TEMPLATES,
  buildSignatureHtml,
  buildSignatureText,
  escapeHtml,
  formatHtml,
  initialsOf,
  isEmail,
  isHexColor,
  normalizeUrl,
  telHref,
} from './emailSignature';

describe('escapeHtml', () => {
  it('escapes the characters that can break out of text or an attribute', () => {
    expect(escapeHtml('<a href="x" onclick=\'y\'>&</a>')).toBe('&lt;a href=&quot;x&quot; onclick=&#39;y&#39;&gt;&amp;&lt;/a&gt;');
    expect(escapeHtml(null)).toBe('');
  });
});

describe('links', () => {
  it('adds https and accepts only web addresses', () => {
    expect(normalizeUrl('example.com/a')).toBe('https://example.com/a');
    expect(normalizeUrl('http://example.com')).toBe('http://example.com');
    for (const bad of ['', 'javascript:alert(1)', 'data:text/html,hi', 'ftp://example.com', 'nodots']) expect(normalizeUrl(bad), bad).toBeNull();
  });
  it('makes a tel link from a typed number', () => {
    expect(telHref('+966 55 123 4567')).toBe('tel:+966551234567');
    expect(telHref('055-123-4567')).toBe('tel:0551234567');
    expect(telHref('123')).toBeNull();
  });
  it('checks emails and colours', () => {
    expect(isEmail('a@b.co')).toBe(true);
    expect(isEmail('a@b')).toBe(false);
    expect(isEmail('a"><script>@b.co')).toBe(false);
    expect(isHexColor('#00AA55')).toBe(true);
    expect(isHexColor('red')).toBe(false);
    expect(isHexColor('#fff')).toBe(false);
  });
  it('takes initials from the first two words', () => {
    expect(initialsOf('sara al harbi')).toBe('SA');
    expect(initialsOf('')).toBe('');
  });
});

describe('buildSignatureHtml', () => {
  it('is empty without a name', () => {
    expect(buildSignatureHtml({ ...EXAMPLE, name: ' ' })).toBe('');
  });
  it('builds every template with the name, contact lines and the accent colour', () => {
    for (const template of TEMPLATES) {
      const html = buildSignatureHtml(EXAMPLE, { template, accent: '#112233' });
      expect(html, template).toContain('Sara Al-Harbi');
      expect(html, template).toContain('mailto:sara@example.com');
      expect(html, template).toContain('tel:+966551234567');
      expect(html, template).toContain('https://example.com');
      expect(html, template).toContain('#112233');
    }
  });
  it('escapes what was typed and never writes a script link', () => {
    const html = buildSignatureHtml({ ...EXAMPLE, name: '<img src=x onerror=alert(1)>', website: 'javascript:alert(1)', email: 'x"@evil.co' });
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(html).not.toContain('javascript:');
    expect(html).not.toContain('mailto:x');
  });
  it('falls back to the default colour for an invalid one', () => {
    expect(buildSignatureHtml(EXAMPLE, { accent: 'red; background:url(x)' })).not.toContain('background:url(x)');
  });
  it('uses the logo address in the copied HTML but only the initials in the preview', () => {
    const values = { ...EXAMPLE, logo: 'https://example.com/logo.png' };
    expect(buildSignatureHtml(values, { template: 'bar' })).toContain('<img src="https://example.com/logo.png"');
    const preview = buildSignatureHtml(values, { template: 'bar', preview: true });
    expect(preview).not.toContain('<img');
    expect(preview).toContain('SA');
  });
  it('ignores a logo that is not a web address', () => {
    expect(buildSignatureHtml({ ...EXAMPLE, logo: 'javascript:alert(1)' }, { template: 'bar' })).not.toContain('<img');
  });
});

describe('buildSignatureText', () => {
  it('lists the filled lines in order', () => {
    expect(buildSignatureText(EXAMPLE).split('\n')).toEqual([
      'Sara Al-Harbi',
      'Head of Marketing, Example Studio',
      '+966 55 123 4567',
      'sara@example.com',
      'example.com',
      'King Fahd Road, Riyadh',
    ]);
  });
});

describe('formatHtml', () => {
  it('puts each block tag on its own line, indented by depth, and keeps inline pieces together', () => {
    expect(formatHtml('<table><tr><td>Hi <b>there</b></td></tr></table>')).toEqual([
      '<table>',
      '  <tr>',
      '    <td>',
      '      Hi <b>there</b>',
      '    </td>',
      '  </tr>',
      '</table>',
    ]);
  });
  it('keeps the whole signature, line by line, as the same markup', () => {
    for (const template of TEMPLATES) {
      const html = buildSignatureHtml(EXAMPLE, { template });
      expect(formatHtml(html).map((line) => line.trim()).join('')).toBe(html);
    }
  });
  it('is empty for an empty string', () => {
    expect(formatHtml('')).toEqual([]);
  });
});
