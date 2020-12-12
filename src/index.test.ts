import configs from './configs/configs';

describe('Application', () => {
  it('config port should be', () => {
    expect(configs.API_PORT).toBe('8080');
  });
});
