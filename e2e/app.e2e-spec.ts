import { RapperPage } from './app.po';

describe('rapper App', function() {
  let page: RapperPage;

  beforeEach(() => {
    page = new RapperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
