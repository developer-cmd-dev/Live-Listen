declare const googleVerify: (token: string) => Promise<{
    googleId: string;
    email: string | undefined;
    name: string | undefined;
    avatar: string | undefined;
    emailVerified: boolean | undefined;
} | undefined>;
export default googleVerify;
//# sourceMappingURL=googleVerify.d.ts.map