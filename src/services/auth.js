// import apiAppSettingsInstance from '../utils/request';

// const authService = {
//     login: async (email, password) => {
//         try {
//             const response = await apiAppSettingsInstance.post('/login', 
//                 { email, password }
//             );
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },

//     register: async (fullname, username, email, password, password_confirmation, photo) => {
//         try {
//             const response = await apiAppSettingsInstance.post('/register', 
//                 { 
//                     fullname, 
//                     username, 
//                     email, 
//                     password, 
//                     password_confirmation, 
//                     photo 
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },

//     loginByGoogle: async () => {
//         try {
//             const response = await apiAppSettingsInstance.post('/auth/google/redirect');
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },

//     callbackLoginByGoogle: async () => {
//         try {
//             const response = await apiAppSettingsInstance.get("/auth/google/callback");
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },

//     verificationEmail: async () => {
//         try {
//             const response = await apiAppSettingsInstance.post('/email/verification-notification');
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },

//     logout: async () => {
//         try {
//             const response = await apiAppSettingsInstance.post('/logout');
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },

//     forgotPassword: async (email) => {
//         try {
//             const response = await apiAppSettingsInstance.post('/forgot-password', { email });
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },

//     resetPassword: async (token, password, password_confirmation) => {
//         try {
//             const response = await apiAppSettingsInstance.post('/reset-password', {
//                 email,
//                 token,
//                 password,
//                 password_confirmation
//             });
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     },
// };

// export default authService;