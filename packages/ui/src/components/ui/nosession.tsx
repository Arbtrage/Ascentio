import { Button } from './button';

export function NoSession() {
    return (
        <div className="flex h-screen items-center justify-center text-center duration-500 animate-in fade-in">
            <div className="p-10 border rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold mb-4">Access Restricted</h1>
                <p className="mb-6">Please log in or sign up to continue.</p>
                <div className="space-x-4">
                    <Button><a href="/auth">Get Started</a></Button>
                </div>
            </div>
        </div>
    );
};
