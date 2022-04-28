export default () => ({
  auth: {
    saltRounds:10,
    jwt: {
      secret: 'olympiagym',
      signOptions: { expiresIn: 3600, }
    }
  }
});