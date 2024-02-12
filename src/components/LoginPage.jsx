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
    const [isResend, setIsResend] = React.useState({val: false, type: 'email'});
    const toggleIsSignup = () => {
        clearErrors();

        if (isSignup && isResend) {
            setIsSignup(false);
            setIsResend({...isResend, val: false})
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
            setError((prevError) => ({...prevError, other: null}));
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

    const onFormSubmit = async ({email, password}) => {
        clearErrors()
        try {
            if (isSignup) {
                if (isResend.val) {
                    if (isResend.type === 'email') {
                        await resendConfirmationEmail({email})
                    } else {
                        await app.emailPasswordAuth.sendResetPasswordEmail({email});
                        setSuccess("An email was sent to your inbox to reset your password.")
                    }
                } else {
                    await app.emailPasswordAuth.registerUser({email, password});
                    setSuccess("A confirmation email was sent to your inbox.")
                }

            } else {
                await app.logIn(Realm.Credentials.emailPassword(email, password));
            }


        } catch (err) {
            handleAuthenticationError(err, setError);
        }
    };

    const resendConfirmationEmail = async ({email}) => {
        try {
            if (isSignup && isResend.type === 'email' && isResend.val) {
                await app.emailPasswordAuth.resendConfirmationEmail({email})
                setSuccess("Confirmation email resent, check your inbox.")
            }
        } catch (err) {
            handleAuthenticationError(err, setError)
        }
    }

    return (
        <Container maxWidth="sm" className="main-container" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 64px)"}}>
            <Card className="auth-card" variant="outlined">
                <form
                    ref={formRef}
                    className="auth-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const {email, password} = Object.fromEntries(formData.entries());
                        onFormSubmit({email, password});
                    }}
                >
                    <Typography component="h2" variant="h4">
                        Don't miss your next bite.
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {isSignup
                            ? isResend.val ? ("Enter your email to " + (isResend.type==="email" ? "resend your email confirmation." : "reset your password."))  : "Enter your email and a password to create a new account."
                            : "Enter your email and a password to log in with an existing account."}
                    </Typography>
                    <NonAuthErrorAlert/>
                    <NonAuthSuccessAlert/>
                    <TextField
                        id="input-email"
                        name="email"
                        placeholder="Email"
                        variant="outlined"
                        error={Boolean(error.email)}
                        helperText={error.email ?? ""}
                    />
                    {isResend.val ? null :
                        <TextField
                        id="input-password"
                        data-testid="input-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        variant="outlined"
                        error={Boolean(error.password)}
                        helperText={error.password ?? ""}
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
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />}

                    <Button
                        id="submit-button"
                        data-testid="submit-button"
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {isSignup ? isResend.val ? "Send" : "Create Account" : "Log In"}
                    </Button>
                    <button
                        id="toggle-auth-type-button"
                        type="button"
                        className="link-button"
                        onClick={() => {toggleIsSignup(); }}
                    >
                        {isSignup
                            ? "Already have an account? Log In"
                            : "Sign up for an account"}
                    </button>

                    {isSignup
                        ? isResend.val ? null : <div style={{display: 'flex', flexDirection:'column'}}>
                            <button id="toggle-auth-type-button"
                                    type="button"
                                    className="link-button"
                                    style={{marginBottom: '10px'}}
                                    onClick={(e) => {
                                        // e.preventDefault();
                                        // const formData = new FormData(formRef.current);
                                        // const {email, password} = Object.fromEntries(formData.entries());
                                        // resendConfirmationEmail({email});
                                        setIsResend({val: true, type: 'email'})
                                    }}>Resend confirmation email
                            </button>
                            <button id="toggle-auth-type-button"
                                    type="button"
                                    className="link-button"
                                    onClick={(e) => {
                                        // e.preventDefault();
                                        // const formData = new FormData(formRef.current);
                                        // const {email, password} = Object.fromEntries(formData.entries());
                                        //resendConfirmationEmail({email});
                                        setIsResend({val: true, type: 'password'})
                                    }}>Forgot password?
                            </button>
                        </div>
                        : null}
                </form>
            </Card>
            {/*<MoreInfoDocsLink />*/}
        </Container>
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
        const {error, statusCode} = err;
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
