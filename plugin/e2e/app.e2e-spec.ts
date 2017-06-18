import { NgxDatePickerPage } from './app.po';

describe('ngx-date-picker App', () => {
  let page: NgxDatePickerPage;

  beforeEach(() => {
    page = new NgxDatePickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
