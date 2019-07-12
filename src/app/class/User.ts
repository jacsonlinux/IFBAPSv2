export class User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  profile: string;
  fcmTokens?: { [token: string]: true };
}
