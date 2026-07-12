import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Truck, AlertCircle } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const success = await login(email, password);
    
    if (success) {
      const user = useAuthStore.getState().user;
      if (user) {
        switch (user.role) {
          case 'fleet_manager':
            navigate('/manager');
            break;
          case 'driver':
            navigate('/driver');
            break;
          case 'safety_officer':
            navigate('/safety');
            break;
          case 'financial_analyst':
            navigate('/finance');
            break;
          default:
            navigate('/');
        }
      }
    } else {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  // Demo accounts helper
  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center transform -rotate-6">
            <Truck className="h-8 w-8 text-white transform rotate-6" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Sign in to TransitOps
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email address</label>
              <div className="mt-1">
                <input
                  type="email" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-1">
                <input
                  type="password" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit" disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h3 className="text-sm font-medium text-slate-900 mb-4 text-center">Demo Credentials</h3>
            <p className="text-xs text-slate-500 mb-4 text-center">Click a role to auto-fill, or type manually.<br/><b>Password for all:</b> password123</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={() => fillDemo('manager@transitops.com')} type="button" className="text-left px-3 py-2 bg-slate-50 border border-slate-200 rounded hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <span className="block text-xs font-bold text-slate-700">Fleet Manager</span>
                <span className="block text-xs text-slate-500">manager@transitops.com</span>
              </button>
              
              <button onClick={() => fillDemo('driver@transitops.com')} type="button" className="text-left px-3 py-2 bg-slate-50 border border-slate-200 rounded hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <span className="block text-xs font-bold text-slate-700">Driver</span>
                <span className="block text-xs text-slate-500">driver@transitops.com</span>
              </button>
              
              <button onClick={() => fillDemo('safety@transitops.com')} type="button" className="text-left px-3 py-2 bg-slate-50 border border-slate-200 rounded hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <span className="block text-xs font-bold text-slate-700">Safety Officer</span>
                <span className="block text-xs text-slate-500">safety@transitops.com</span>
              </button>
              
              <button onClick={() => fillDemo('analyst@transitops.com')} type="button" className="text-left px-3 py-2 bg-slate-50 border border-slate-200 rounded hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <span className="block text-xs font-bold text-slate-700">Financial Analyst</span>
                <span className="block text-xs text-slate-500">analyst@transitops.com</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple clsx implementation if you don't want to import it here just for one class
function clsx(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
