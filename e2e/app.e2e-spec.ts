import { TtPage } from './app.po';

describe('tt App', () => {
  let page: TtPage;

  beforeEach(() => {
    page = new TtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
