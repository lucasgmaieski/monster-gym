import { OneSignal } from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
    OneSignal.User.addTag("user_email", email);
}

export function tagNumTreinosUpdate(nTreinos: string) {
    let timestamp = Math.floor(Date.now() / 1000);

    OneSignal.User.addTags({
        n_treinos: nTreinos,
        treinos_update: timestamp,
    })
}