import { useAuth } from '../../context/Auth';
import EmailVerificationForm from '../../components/organism/EmailVerificationForm';

export default function EmailVerificationPage() {
    const { user } = useAuth();
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <EmailVerificationForm user={user} />
        </div>
    );
};