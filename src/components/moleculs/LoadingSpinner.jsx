const LoadingSpinner = ({ size = 'medium', fullScreen = false }) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    };

    const spinner = (
        <div className="flex items-center justify-center">
            <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary-600 rounded-full animate-spin`}></div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
                <div className="text-center">
                    {spinner}
                    <p className="mt-2 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return spinner;
};

export default LoadingSpinner;