const Validations = () => ({
    userRules: {
      email: 'required|email',
      password: 'required|min:6|confirmed',
      password_confirmation: 'required',
      firstName: 'required|min:3|string|max:20',
      lastName: 'required|min:3|string|max:20',
      isAdmin: 'required|boolean'
    },
    signinRules: {
      email: 'required|email',
      password: 'required'
    }
  });

  
export default Validations;