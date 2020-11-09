import * as Yup from 'yup';

const initRegisterData = {
   rider_email : "",
    password: "",
    rider_phone: "",
    rider_name: "",
    referral_code:"",
    nationality: "1"
}

const FieldList =  [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'email',
      label: 'Email Address'
    },
    {
      name: 'mobile',
      label: 'Mobile Number'
    },
    {
      name: 'password',
      label: 'Password'
    },
    {
      name: 'invitationCode',
      label: 'Invitation Code'
    }
];

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const RegisterSchema = Yup.object().shape({
    rider_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    rider_phone: Yup.string()
      .matches(phoneRegExp, 'Phone number is not valid'),
    rider_email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    // referral_code: Yup.string()
    //   .min(2, 'Too Short!')
    //   .max(50, 'Too Long!')
    //   .required('Required'),
});
  
export {
    initRegisterData,
    FieldList,
    RegisterSchema
}

