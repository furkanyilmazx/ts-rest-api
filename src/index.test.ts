import configs from './configs/configs';

describe('Application', () => {
  it('config port should be', () => {
    expect(configs.appPort).toBe('8080');
  });
});
