
import { useState, useEffect, useContext, createContext } from "react";
import * as firebaseui from 'firebaseui';
import {EmailAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail as authSendPasswordResetEmail, confirmPasswordReset as authConfirmPasswordReset } from "firebase/auth";
import { auth } from '../db';

type UseAuthReturn = any;
// interface UseAuthReturn {
//     user?: firebase.User;
//     signin: firebase.auth.Auth['signInWithEmailAndPassword'];
//     signup: firebase.auth.Auth['createUserWithEmailAndPassword'];
//     signout: firebase.auth.Auth['signOut'];
//     sendPasswordResetEmail: firebase.auth.Auth['sendPasswordResetEmail'];
//     confirmPasswordReset: firebase.auth.Auth['confirmPasswordReset'];
// }

// @ts-ignore
const authContext = createContext<UseAuthReturn>({
    user: undefined
});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (<authContext.Provider value={auth} > {children} </authContext.Provider>);
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = (): UseAuthReturn => {
    return useContext(authContext);
};


// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState<UseAuthReturn['user']>();
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin: UseAuthReturn['signin'] = async (email, password) => {
        const response = await
            signInWithEmailAndPassword(auth, email, password);
        setUser(response.user);
        return response;
    };
    const signup: UseAuthReturn['signup'] = async (email, password) => {
        const response =
            await createUserWithEmailAndPassword(auth, email, password);
        setUser(response.user);
        return response;
    };
    const signout: UseAuthReturn['signout'] = async () => {
        await auth
            .signOut();
        return setUser(undefined);
    };
    const sendPasswordResetEmail: UseAuthReturn['sendPasswordResetEmail'] = async (email) => {
        await
            authSendPasswordResetEmail(auth, email);
    };
    const confirmPasswordReset: UseAuthReturn['confirmPasswordReset'] = async (code, password) => {
        await
            authConfirmPasswordReset(auth, code, password);
    };
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}

// FirebaseUI config.

let ui;
export const initAuth = () => {
    if (ui) {
        return ui;
    }
    const uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            EmailAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
    };
    // Initialize the FirebaseUI Widget using Firebase.
    ui = new firebaseui.auth.AuthUI(auth);
    ui.appendUI = () => ui.start('#firebaseui-auth-container', uiConfig);
    return ui;

}
