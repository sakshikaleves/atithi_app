// // pages/api/auth/login.js
// import db from '../../../lib/db';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   const { email, password } = req.body;

//   try {
//     const query = 'SELECT * FROM superadmin WHERE email = $1';
//     const values = [email];
//     const result = await db.query(query, values);

//     if (result.rows.length === 0) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const admin = result.rows[0];
//     const isValid = await bcrypt.compare(password, admin.password);

//     if (!isValid) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

//E:\super_admin\new_pro\pages\api\auth\login.js
// import db from '../../../lib/db';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   const { email, password } = req.body;

//   try {
//     console.log('Attempting login for email:', email);

//     // Check superadmin table first
//     let query = 'SELECT * FROM superadmin WHERE email = $1';
//     let values = [email];
//     let result = await db.query(query, values);

//     if (result.rows.length > 0) {
//       console.log('Superadmin found:', email);
//       const superadmin = result.rows[0];
//       const isValid = await bcrypt.compare(password, superadmin.password);

//       if (isValid) {
//         console.log('Superadmin login successful:', email);
//         return res.status(200).json({ message: 'Login successful', redirectTo: '/add-client', role: 'superadmin' });
//       } else {
//         console.log('Superadmin invalid password:', email);
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
//     }

//     // If not found in superadmin, check in clients
//     query = 'SELECT * FROM clients WHERE email = $1';
//     result = await db.query(query, values);

//     if (result.rows.length === 0) {
//       console.log('Client not found:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const client = result.rows[0];
//     const isValid = await bcrypt.compare(password, client.password);

//     if (!isValid) {
//       console.log('Client invalid password:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Check if the password is the temporary password
//     if (password === 'TempPass123') {
//       console.log('Client using temporary password:', email);
//       return res.status(200).json({ message: 'Change password', redirectTo: `/change-password?clientId=${client.id}`, role: 'client' });
//     }

//     console.log('Client login successful:', email);
//     return res.status(200).json({ message: 'Login successful', redirectTo: `/client-dashboard?clientId=${client.id}`, role: 'client' });

//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// }
// new_pro\pages\api\auth\login.js
// import db from '../../../lib/db';
// import bcrypt from 'bcryptjs';
// import { signToken } from '../../../utils/jwt';

// export default async function handler(req, res) {
//   const { email, password } = req.body;

//   try {
//     console.log('Attempting login for email:', email);

//     // Check in clients table
//     const query = 'SELECT * FROM clients WHERE email = $1';
//     const values = [email];
//     const result = await db.query(query, values);

//     if (result.rows.length === 0) {
//       console.log('Client not found:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const client = result.rows[0];
//     const isValid = await bcrypt.compare(password, client.password);

//     if (!isValid) {
//       console.log('Client invalid password:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = signToken({ clientId: client.id, email: client.email });

//     console.log('Client login successful:', email);
//     return res.status(200).json({ message: 'Login successful', token, redirectTo: `/client-dashboard?clientId=${client.id}` });

//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// }
// import db from '../../../lib/db';
// import bcrypt from 'bcryptjs';
// import { signToken } from '../../../utils/jwt';

// export default async function handler(req, res) {
//   const { email, password } = req.body;

//   try {
//     console.log('Attempting login for email:', email);

//     // Check in clients table
//     const query = 'SELECT * FROM clients WHERE email = $1';
//     const values = [email];
//     const result = await db.query(query, values);

//     if (result.rows.length === 0) {
//       console.log('Client not found in clients table:', email);

//       // Check in superadmin table
//       const superAdminQuery = 'SELECT * FROM superadmin WHERE email = $1';
//       const superAdminResult = await db.query(superAdminQuery, values);

//       if (superAdminResult.rows.length === 0) {
//         console.log('Superadmin not found:', email);
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       const superAdmin = superAdminResult.rows[0];
//       if (superAdmin.password === password) {
//         const token = signToken({ email: superAdmin.email });

//         console.log('Superadmin login successful:', email);
//         return res.status(200).json({ message: 'Login successful', token, redirectTo: `/add-client` });
//       } else {
//         console.log('Superadmin invalid password:', email);
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
//     }

//     const client = result.rows[0];
//     const isValid = await bcrypt.compare(password, client.password);

//     if (!isValid) {
//       console.log('Client invalid password:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = signToken({ clientId: client.id, email: client.email });

//     console.log('Client login successful:', email);
//     return res.status(200).json({ message: 'Login successful', token, redirectTo: `/client-dashboard?clientId=${client.id}` });

//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// }
// import db from '../../../lib/db';
// import bcrypt from 'bcryptjs';
// import { signToken } from '../../../utils/jwt';

// export default async function handler(req, res) {
//   const { email, password } = req.body;

//   try {
//     console.log('Attempting login for email:', email);

//     // Check in clients table
//     const clientQuery = 'SELECT * FROM clients WHERE email = $1';
//     const clientValues = [email];
//     const clientResult = await db.query(clientQuery, clientValues);

//     if (clientResult.rows.length === 0) {
//       console.log('Client not found in clients table:', email);

//       // Check in superadmin table
//       const superAdminQuery = 'SELECT * FROM superadmin WHERE email = $1';
//       const superAdminResult = await db.query(superAdminQuery, clientValues);

//       if (superAdminResult.rows.length === 0) {
//         console.log('Superadmin not found:', email);
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       const superAdmin = superAdminResult.rows[0];
//       const isValidSuperAdmin = await bcrypt.compare(password, superAdmin.password);

//       if (!isValidSuperAdmin) {
//         console.log('Superadmin invalid password:', email);
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       const token = signToken({ email: superAdmin.email });
//       console.log('Superadmin login successful:', email);
//       return res.status(200).json({ message: 'Login successful', token, redirectTo: `/add-client` });
//     }

//     const client = clientResult.rows[0];
//     const isValidClient = await bcrypt.compare(password, client.password);

//     if (!isValidClient) {
//       console.log('Client invalid password:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     if (client.first_login) {
//       // Redirect to change password page on first login
//       console.log('First login detected:', email);
//       const token = signToken({ clientId: client.id, email: client.email });
//       return res.status(200).json({ message: 'First login, please change your password', token, redirectTo: `/change-password?clientId=${client.id}` });
//     }

//     const token = signToken({ clientId: client.id, email: client.email });
//     console.log('Client login successful:', email);
//     return res.status(200).json({ message: 'Login successful', token, redirectTo: `/client-dashboard?clientId=${client.id}` });

//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// }
// import db from '../../../lib/db';
// import bcrypt from 'bcryptjs';

// export default async function handler(req, res) {
//   const { email, password } = req.body;

//   try {
//     console.log('Attempting login for email:', email);

//     // Check superadmin table first
//     let query = 'SELECT * FROM superadmin WHERE email = $1';
//     let values = [email];
//     let result = await db.query(query, values);

//     if (result.rows.length > 0) {
//       console.log('Superadmin found:', email);
//       const superadmin = result.rows[0];
//       const isValid = await bcrypt.compare(password, superadmin.password);

//       if (isValid) {
//         console.log('Superadmin login successful:', email);
//         return res.status(200).json({ message: 'Login successful', redirectTo: '/add-client', role: 'superadmin' });
//       } else {
//         console.log('Superadmin invalid password:', email);
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
//     }

//     // If not found in superadmin, check in clients
//     query = 'SELECT * FROM clients WHERE email = $1';
//     result = await db.query(query, values);

//     if (result.rows.length === 0) {
//       console.log('Client not found:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const client = result.rows[0];
//     const isValid = await bcrypt.compare(password, client.password);

//     if (!isValid) {
//       console.log('Client invalid password:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Check if the password is the temporary password
//     if (password === 'TempPass123') {
//       console.log('Client using temporary password:', email);
//       return res.status(200).json({ message: 'Change password', redirectTo: `/change-password?clientId=${client.id}`, role: 'client' });
//     }

//     console.log('Client login successful:', email);
//     return res.status(200).json({ message: 'Login successful', redirectTo: `/client-dashboard?clientId=${client.id}`, role: 'client' });

//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// }

// import db from '../../../lib/db';
// import bcrypt from 'bcryptjs';
// import { signToken } from '../../../utils/jwt';

// export default async function handler(req, res) {
//   const { email, password } = req.body;

//   try {
//     console.log('Attempting login for email:', email);

//     // Check superadmin table first
//     let query = 'SELECT * FROM superadmin WHERE email = $1';
//     let values = [email];
//     let result = await db.query(query, values);

//     if (result.rows.length > 0) {
//       console.log('Superadmin found:', email);
//       const superadmin = result.rows[0];
//       const isValid = await bcrypt.compare(password, superadmin.password);

//       if (isValid) {
//         console.log('Superadmin login successful:', email);
//         const token = signToken({ email: superadmin.email });
//         return res.status(200).json({ message: 'Login successful', token, redirectTo: '/add-client', role: 'superadmin' });
//       } else {
//         console.log('Superadmin invalid password:', email);
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
//     }

//     // If not found in superadmin, check in clients
//     query = 'SELECT * FROM clients WHERE email = $1';
//     result = await db.query(query, values);

//     if (result.rows.length === 0) {
//       console.log('Client not found:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const client = result.rows[0];
//     const isValid = await bcrypt.compare(password, client.password);

//     if (!isValid) {
//       console.log('Client invalid password:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Check if the password is the temporary password or first login
//     if (client.first_login || password === 'TempPass123') {
//       console.log('Client using temporary password or first login:', email);
//       const token = signToken({ clientId: client.id, email: client.email });
//       return res.status(200).json({ message: 'First login, please change your password', token, redirectTo: `/change-password?clientId=${client.id}`, role: 'client' });
//     }

//     const token = signToken({ clientId: client.id, email: client.email });
//     console.log('Client login successful:', email);
//     return res.status(200).json({ message: 'Login successful', token, redirectTo: `/client-dashboard?clientId=${client.id}`, role: 'client' });

//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// }

// import db from '../../../lib/db';
// import bcrypt from 'bcryptjs';
// import { signToken } from '../../../utils/jwt';

// export default async function handler(req, res) {
//   const { email, password } = req.body;

//   try {
//     console.log('Attempting login for email:', email);

//     // Check in superadmin table
//     let query = 'SELECT * FROM superadmin WHERE email = $1';
//     let values = [email];
//     let result = await db.query(query, values);

//     if (result.rows.length > 0) {
//       console.log('Superadmin found:', email);
//       const superadmin = result.rows[0];
//       const isValid = await bcrypt.compare(password, superadmin.password);

//       if (isValid) {
//         console.log('Superadmin login successful:', email);
//         const token = signToken({ email: superadmin.email });
//         return res.status(200).json({ message: 'Login successful', token, redirectTo: '/add-client', role: 'superadmin' });
//       } else {
//         console.log('Superadmin invalid password:', email);
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
//     }

//     // If not found in superadmin, check in clients
//     query = 'SELECT * FROM clients WHERE email = $1';
//     result = await db.query(query, values);

//     if (result.rows.length === 0) {
//       console.log('Client not found:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const client = result.rows[0];
//     const isValid = await bcrypt.compare(password, client.password);

//     if (!isValid) {
//       console.log('Client invalid password:', email);
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Check if the password is the temporary password or first login
//     if (client.first_login || password === 'TempPass123') {
//       console.log('Client using temporary password or first login:', email);
//       const token = signToken({ clientId: client.id, email: client.email });
//       return res.status(200).json({ message: 'First login, please change your password', token, redirectTo: `/change-password?clientId=${client.id}`, role: 'client' });
//     }

//     const token = signToken({ clientId: client.id, email: client.email });
//     console.log('Client login successful:', email);
//     return res.status(200).json({ message: 'Login successful', token, redirectTo: `/client-dashboard?clientId=${client.id}`, role: 'client' });

//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// }



import db from '../../../lib/db';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/jwt';

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    console.log('Attempting login for email:', email);

    // Check in clients table
    const query = 'SELECT * FROM clients WHERE email = $1';
    const values = [email];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      console.log('Client not found in clients table:', email);

      // Check in superadmin table
      const superAdminQuery = 'SELECT * FROM superadmin WHERE email = $1';
      const superAdminResult = await db.query(superAdminQuery, values);

      if (superAdminResult.rows.length === 0) {
        console.log('Superadmin not found:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const superAdmin = superAdminResult.rows[0];
      if (superAdmin.password === password) {
        const token = signToken({ email: superAdmin.email });

        console.log('Superadmin login successful:', email);
        return res.status(200).json({ message: 'Login successful', token, redirectTo: `/add-client` });
      } else {
        console.log('Superadmin invalid password:', email);
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    const client = result.rows[0];
    const isValid = await bcrypt.compare(password, client.password);

    if (!isValid) {
      console.log('Client invalid password:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken({ clientId: client.id, email: client.email });

    console.log('Client login successful:', email);
    return res.status(200).json({ message: 'Login successful', token, redirectTo: `/client-dashboard?clientId=${client.id}` });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
