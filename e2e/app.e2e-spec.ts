import { InvoicePage } from './app.po';

describe('invoice App', () => {
  let page: InvoicePage;

  beforeEach(() => {
    page = new InvoicePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
