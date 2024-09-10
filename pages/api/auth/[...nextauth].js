import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '../../../lib/db';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        try {
          // Check superadmin table first
          let query = 'SELECT * FROM superadmin WHERE email = $1';
          let values = [email];
          let result = await db.query(query, values);

          if (result.rows.length > 0) {
            const superadmin = result.rows[0];
            const isValid = await bcrypt.compare(password, superadmin.password);

            if (isValid) {
              return { id: superadmin.id, email: superadmin.email, role: 'superadmin' };
            }
          }

          // If not found in superadmin, check in clients
          query = 'SELECT * FROM clients WHERE email = $1';
          result = await db.query(query, values);

          if (result.rows.length > 0) {
            const client = result.rows[0];
            const isValid = await bcrypt.compare(password, client.password);

            if (isValid) {
              // Check if the password is the temporary password
              if (password === 'TempPass123') {
                throw new Error('Change password');
              }
              return { id: client.id, email: client.email, role: 'client', clientId: client.id };
            }
          }

          // If neither superadmin nor client found or password mismatch
          return null;
        } catch (error) {
          throw new Error('Invalid email or password');
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.clientId = token.clientId;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.clientId = user.clientId;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    newUser: null
  }
});
