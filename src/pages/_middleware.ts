import { withAuth } from 'next-auth/middleware';

export default withAuth({
    callbacks: {
        authorized: ({ token }) =>
            token?.email === 'tylersi93@gmail.com' || token?.email === 'marinobethany002@gmail.com' || token?.email === 'shelmarino@gmail.com',
    },
});
