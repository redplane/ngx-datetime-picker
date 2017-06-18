import { NgxBootstrapDatetimePickerPage } from './app.po';

describe('ngx-bootstrap-datetime-picker App', () => {
  let page: NgxBootstrapDatetimePickerPage;

  beforeEach(() => {
    page = new NgxBootstrapDatetimePickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
