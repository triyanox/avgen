import AvatarGenerator from '../src/index';

describe('AvatarGenerator buffer return', () => {
  it('Should return a buffer', async () => {
    const generator = new AvatarGenerator({
      name: 'John Doe',
      path: '/tmp',
    });
    const buffer = await generator.generate();
    expect(buffer).toBeInstanceOf(Buffer);
  });
});
