export default () => ({
  auth: {
    jwt: {
      secret: 'olympiagym',
      signOptions: { expiresIn: 3600, }
    }
  }
});