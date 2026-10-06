import { describe, expect, it } from 'vitest';
import { PAGE_LOADERS, pageIdForPath } from './pageLoaders';
import { PAGE_ROUTES } from './routeTable';

describe('page loaders', () => {
  it('has a loader for every page route, the home page and the 404 page', () => {
    PAGE_ROUTES.forEach(({ id }) => expect(PAGE_LOADERS[id], id).toBeTypeOf('function'));
    expect(PAGE_LOADERS.home).toBeTypeOf('function');
    expect(PAGE_LOADERS.notFound).toBeTypeOf('function');
  });

  it.each([
    ['/', 'home'],
    ['/en', 'home'],
    ['/en/', 'home'],
    ['/about', 'about'],
    ['/en/about', 'about'],
    ['/en/about/', 'about'],
    ['/services', 'services'],
    ['/services/saas-erp', 'serviceDetail'],
    ['/en/services/seo-services', 'serviceDetail'],
    ['/portfolio/rveta', 'productDetail'],
    ['/blog/answer-engine-optimization-basics', 'blogPost'],
    ['/process', 'process'],
    ['/privacy', 'privacy'],
    ['/en/terms', 'terms'],
    ['/admin/inbox', 'adminInbox'],
  ])('maps %s to the %s page', (pathname, id) => {
    expect(pageIdForPath(pathname)).toBe(id);
  });

  it('returns null for paths that are not pages', () => {
    expect(pageIdForPath('/no-such-page')).toBeNull();
    expect(pageIdForPath('/en/services/a/b')).toBeNull();
  });
});
