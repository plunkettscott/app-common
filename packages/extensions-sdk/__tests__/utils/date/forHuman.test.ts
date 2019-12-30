import forHuman from '../../../src/utils/date/forHuman';

const realDateNow = Date.now.bind(global.Date);
const dateNowStub = jest.fn(() => Date.UTC(2019, 0, 25, 12, 0, 0, 0));

describe('forHuman utility', () => {
  beforeEach(() => {
    global.Date.now = dateNowStub;
  });

  afterEach(() => {
    global.Date.now = realDateNow;
  });

  it('reverts to current time if no time is specified', () => {
    expect(forHuman()).toBe('25 Jan');
    expect(dateNowStub).toHaveBeenCalled();
  });

  it('reverts to current time if provided time is after current time', () => {
    const currentDate = new Date();

    expect(
      forHuman(
        new Date(currentDate.setFullYear(currentDate.getFullYear() + 2)),
      ),
    ).toBe('25 Jan');
  });

  it('displays year if less than 30 days AND is from previous year', () => {
    const realDateNow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => Date.UTC(2020, 0, 1, 12, 0, 0, 0));
    const datePrevStub = jest.fn(() => Date.UTC(2019, 11, 30, 12, 0, 0, 0));

    global.Date.now = dateNowStub;
    expect(forHuman(new Date(datePrevStub()))).toBe('Dec 2019');

    expect(dateNowStub).toHaveBeenCalled();
    expect(datePrevStub).toHaveBeenCalled();

    global.Date.now = realDateNow;
  });

  it('relies on default if over 30 days', () => {
    const realDateNow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => Date.UTC(2025, 1, 1, 12, 0, 0, 0));
    const datePrevStub = jest.fn(() => Date.UTC(2019, 11, 30, 12, 0, 0, 0));

    global.Date.now = dateNowStub;
    expect(forHuman(new Date(datePrevStub()))).toBe('5 years ago');

    expect(dateNowStub).toHaveBeenCalled();
    expect(datePrevStub).toHaveBeenCalled();

    global.Date.now = realDateNow;
  });
});
