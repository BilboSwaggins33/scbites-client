import React from "react";
import * as Realm from "realm-web";
import { useApp } from "./RealmApp";
import {
    Container,
    TextField,
    Button,
    IconButton,
    Card,
    Typography,
    InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toggleBoolean } from "../utils";
import { useErrorAlert } from "../hooks/useErrorAlert";



export function LoginPage() {
    const app = useApp();
    const formRef = React.useRef();
    // Track whether the user is logging in or signing up for a new account
    const [isSignup, setIsSignup] = React.useState(false);
    const [isResend, setIsResend] = React.useState({ val: false, type: 'email' });
    const toggleIsSignup = () => {
        clearErrors();

        if (isSignup && isResend) {
            setIsSignup(false);
            setIsResend({ ...isResend, val: false })
        } else {
            setIsSignup(toggleBoolean)
        }
    };

    // Authentication errors
    const noErrors = {
        email: null,
        password: null,
        other: null,
    };
    const [error, setError] = React.useState(noErrors);
    const [success, setSuccess] = React.useState(null)
    const clearErrors = () => {
        setError(noErrors);
        setSuccess(false)
    };

    const NonAuthErrorAlert = useErrorAlert({
        error: error.other,
        clearError: () => {
            setError((prevError) => ({ ...prevError, other: null }));
        },
        severity: "error"
    });

    const NonAuthSuccessAlert = useErrorAlert({
        error: success,
        clearError: () => {
            setSuccess(null)
        },
        severity: "success"
    });
    // Manage password visibility
    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => setShowPassword(toggleBoolean);

    const onFormSubmit = async ({ email, password }) => {
        clearErrors()
        try {
            if (isSignup) {
                if (isResend.val) {
                    if (isResend.type === 'email') {
                        await resendConfirmationEmail({ email })
                    } else {
                        await app.emailPasswordAuth.sendResetPasswordEmail({ email });
                        setSuccess("An email was sent to your inbox to reset your password.")
                    }
                } else {
                    await app.emailPasswordAuth.registerUser({ email, password });
                    setSuccess("A confirmation email was sent to your inbox.")
                }

            } else {
                await app.logIn(Realm.Credentials.emailPassword(email, password));
            }


        } catch (err) {
            handleAuthenticationError(err, setError);
        }
    };

    const resendConfirmationEmail = async ({ email }) => {
        try {
            if (isSignup && isResend.type === 'email' && isResend.val) {
                await app.emailPasswordAuth.resendConfirmationEmail({ email })
                setSuccess("Confirmation email resent, check your inbox.")
            }
        } catch (err) {
            handleAuthenticationError(err, setError)
        }
    }
    return (
        <div className="login-container" >
            <div className="auth-card" variant="outlined">
                <form
                    ref={formRef}
                    className="auth-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const { email, password } = Object.fromEntries(formData.entries());
                        onFormSubmit({ email, password });
                    }}
                >
                    <Typography color={"#3a3a3a"} fontWeight={600} sx={{ fontSize: 'max(4vw,32px)', lineHeight: 'max(4vw, 32px)' }} >
                        Don't miss <br /> your next bite.</Typography>
                    <Typography color={"#3a3a3a"} sx={{ fontSize: 'max(1vw, 18px)' }} fontWeight={500} gutterBottom>
                        {isSignup
                            ? isResend.val ? ("Enter your email to " + (isResend.type === "email" ? "resend your email confirmation." : "reset your password.")) : "To create a new account, please provide an email and password."
                            : "Enter your email and password to login with an existing account."}
                    </Typography>
                    <NonAuthErrorAlert />
                    <NonAuthSuccessAlert />
                    <TextField
                        id="input-email"
                        name="email"
                        placeholder="Email"
                        variant="standard"
                        error={Boolean(error.email)}
                        helperText={error.email ?? ""}
                        inputProps={{ color: '#3a3a3a' }}
                        sx={{
                            input: { color: '#3a3a3a', fontWeight: 600, fontSize: '20px' }, '& .MuiInput-underline:before': { borderBottomColor: 'grey' },
                            '& .MuiInput-underline:after': { borderBottomColor: '#3a3a3a' },
                            '&& .MuiInput-underline:hover::after': { borderBottomColor: '#3a3a3a' },
                            '&& .MuiInput-underline:hover::before': { borderBottomColor: '#3a3a3a' },


                        }}
                    />
                    {isResend.val ? null :
                        <TextField
                            id="input-password"
                            data-testid="input-password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            variant="standard"
                            error={Boolean(error.password)}
                            helperText={error.password ?? ""}
                            sx={{
                                input: { color: '#3a3a3a', fontWeight: 600, fontSize: '20px' }, '& .MuiInput-underline:before': { borderBottomColor: 'grey' },
                                '& .MuiInput-underline:after': { borderBottomColor: '#3a3a3a' },
                                '&& .MuiInput-underline:hover::after': { borderBottomColor: '#3a3a3a' },
                                '&& .MuiInput-underline:hover::before': { borderBottomColor: '#3a3a3a' },

                                '& .MuiFormLabel-root': { color: '#3a3a3a' }

                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowPassword}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                            }}
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />}

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            id="submit-button"
                            data-testid="submit-button"
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginBottom: 3, borderRadius: 10, fontWeight: 600, width: 300 }}
                        >
                            {isSignup ? isResend.val ? "Send" : "Create New Account" : "Login"}
                        </Button>
                    </div>
                    <button
                        id="toggle-auth-type-button"
                        type="button"
                        className="link-button"
                        onClick={() => { toggleIsSignup(); }}
                        style={{ color: '#3a3a3a' }}
                    >
                        {isSignup
                            ? "Already have an account? Log In"
                            : "Sign up for an account"}
                    </button>

                    {isSignup
                        ? isResend.val ? null : <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <button id="toggle-auth-type-button"
                                type="button"
                                className="link-button"
                                style={{ marginBottom: '10px', color: '#3a3a3a' }}
                                onClick={(e) => {
                                    // e.preventDefault();
                                    // const formData = new FormData(formRef.current);
                                    // const {email, password} = Object.fromEntries(formData.entries());
                                    // resendConfirmationEmail({email});
                                    setIsResend({ val: true, type: 'email' })
                                }}>Resend confirmation email
                            </button>
                            <button id="toggle-auth-type-button"
                                type="button"
                                className="link-button"
                                style={{ color: '#3a3a3a' }}
                                onClick={(e) => {
                                    // e.preventDefault();
                                    // const formData = new FormData(formRef.current);
                                    // const {email, password} = Object.fromEntries(formData.entries());
                                    //resendConfirmationEmail({email});
                                    setIsResend({ val: true, type: 'password' })
                                }}>Forgot password?
                            </button>
                        </div>
                        : null}
                </form>
            </div>
            <div className="campus-img">

            </div>
            {/*<MoreInfoDocsLink />*/}
        </div >
    );
}

function handleAuthenticationError(err, setError) {
    const handleUnknownError = () => {
        setError((prevError) => ({
            ...prevError,
            other: "Something went wrong. Try again in a little bit.",
        }));
        console.warn(
            "Something went wrong with a login or signup request. See the following error for details."
        );
        console.error(err);
    };
    if (err instanceof Realm.MongoDBRealmError) {
        const { error, statusCode } = err;
        const errorType = error || statusCode;
        switch (errorType) {
            case "already confirmed":
                setError((prevError) => ({
                    ...prevError,
                    email: "Email already confirmed",
                }));
                break;
            case "invalid username":
            case "email invalid":
                setError((prevError) => ({
                    ...prevError,
                    email: "Invalid email address.",
                }));
                break;
            case "confirmation required":
                break;
            case "invalid username/password":
            case "invalid password":
            case 401:
                setError((prevError) => ({
                    ...prevError,
                    password: "Incorrect password.",
                }));
                break;
            case "name already in use":
            case 409:
                setError((prevError) => ({
                    ...prevError,
                    email: "Email is already registered.",
                }));
                break;
            case "password must be between 6 and 128 characters":
            case 400:
                setError((prevError) => ({
                    ...prevError,
                    password: "Password must be between 6 and 128 characters.",
                }));
                break;
            case "user not found":
                setError((prevError) => ({
                    ...prevError,
                    other: "Email not found.",
                }));
                break;
            default:
                handleUnknownError();
                break;
        }
    } else {
        handleUnknownError();
    }
}
