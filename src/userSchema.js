import * as Yup from 'yup'
import assert from 'assert'
const userSchema = Yup.object().shape({
    userName: Yup.string()
        .min(5, 'Too Short!')
        .max(20, 'Too Long!')
        .required('User Name is required'),
    fname: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('first Name is Required'),
    lname: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('last Name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('email is required'),
    dob: Yup.date()
        .nullable(), // מאחר שזה לא שדה חובה
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    addressLine1: Yup.string()
        .min(5, 'Address line 1 must be at least 5 characters')
        .required('Address line 1 is required'),
    addressLine2: Yup.string()
        .min(5, 'Address line 2 must be at least 5 characters')
        .nullable(),
    city: Yup.string()
        .required('City is required'),
    state: Yup.string()
        .required('State is required'),
    postalCode: Yup.string()
        .matches(/^\d+$/, 'Postal Code must be numeric')
        .required('Postal Code is required'),
    phone: Yup.string()
        .matches(/^\d+$/, 'Phone must be numeric')
        .min(10, 'Phone must be at least 10 digits')
        .required('Phone is required'),
});
export default userSchema

/* const ourYup = {
    validations: [],
    string: function () {
        this.validations.push('string')
        return this
    },
    number: function () {
        this.validations.push('number')
        return this
    },
    lengt: function (n) {
        this.validations.push({ lengt: n })
        return this
    },
    min: function (n) {
        this.validations.push({ min: n })
        return this
    },
    max: function (n) {
        this.validations.push({ max: n })
        return this
    },
    validate: function (str) {
        for (const valid of this.validations) {
            if (valid === 'string' || valid === 'number') {
                assert(typeof str === valid)
            }
            if (typeof valid === 'object') {
                if ('lengt' in valid) {
                    assert(valid.lengt === str.length)
                }
                if ('min' in valid) {
                    assert(valid.min < str.length+1)
                }
                if ('max' in valid) {
                    assert(valid.max > str.length-1)
                }
            }
        }console.log(this.validations)
    }
}
ourYup.string().min(5).max(10).validate('1234567891') */

/* const MyChecker = {
    s: [], r: [], v: [],
    check: function (s) {
        this.s.push(s)
        return this
    },

    match: function (r, m) {
        this.r.push({
            r: r,
            m: m
        })
        return this
    },
    email: function (e) {
        if (!e) { return this }
        this.v.push(e.match(/^\w+@\w+\.[a-z]{1,3}$/i) ? { [`GMAIL "${e}"`]: true } : { [`GMAIL "${e}"`]: false })

        return this
    },
    phone: function (p) {
        if (!p) { return this }
        this.v.push(p.match(/^(\(|)\d{3}(\)|)-\d{1,3}-\d{1,4}$/) ? { [`PHONE "${p}"`]: true } : { [`PHONE "${p}"`]: false })

        return this
    },
    url: function (u) {
        if (!u) { return this }
        this.v.push(u.match(/^(https:\/\/|http:\/\/|)(www|)[\w]+.(com|net|org)$/i) ? { [`URL "${u}"`]: true } : { [`URL "${u}"`]: false })

        return this
    },
    run: function () {
        return [this.s.reduce(
            (result, str) => {
                let m = [];
                for (const rgx of this.r) {
                    str.match(rgx.r) ? m.push(rgx.m) : ""
                }
                result[str] = m;
                return (result);
            }, {}), this.v];
    }
}
let result = MyChecker
    .check("abc")
    .check("abcd")
    .check("123")
    .check(" ")
    .match(/^[a-z]{1,3}$/, "three letter word")
    .match(/^[a-z0-9]/, "starts with 3 letters or numbers")
    .match(/^\w+@[a-z]+\.[a-z]+$/, 'this is a gmail')
    .email('checkAvelid@Gmail.cOm')
    .email('checkANonvelid@@gmail.cOm')
    .phone('929-651-9180')
    .phone('(929)-651-9180')
    .phone('(929)651-9180')
    .phone('929-6519180')
    .url('viewpointlearn.com')
    .url('http://viewpointlearn.com')
    .run()
console.log(result) */