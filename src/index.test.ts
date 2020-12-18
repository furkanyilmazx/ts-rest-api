import CONFIG from '@system/configs';

describe('Application', () => {
  it('config port should be', () => {
    expect(CONFIG.API_PORT).toBe('8080');
  });
});
