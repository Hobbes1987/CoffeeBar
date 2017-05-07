import { CoffeeBarAppPage } from './app.po';

describe('coffee-bar-app App', () => {
  let page: CoffeeBarAppPage;

  beforeEach(() => {
    page = new CoffeeBarAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
