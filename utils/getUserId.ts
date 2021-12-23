import { getAuth, signInAnonymously } from "firebase/auth";

export async function getUserId() {
    const auth = getAuth();
    const data = await signInAnonymously(auth);

    return data.user.uid
}
