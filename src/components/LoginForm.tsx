import React, { useState } from 'react';
import { identityService } from '../services/identityServices';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await identityService.login(formData);
            localStorage.setItem('token', response.data?.token || '');
            // 跳转到首页或其他页面
            window.location.href = '/';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            //setError(err.response?.data?.message || '登录失败');
            setError('登录失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="邮箱"
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="密码"
                    required
                />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit" disabled={loading}>
                {loading ? '登录中...' : '登录'}
            </button>
        </form>
    );
};

export default LoginForm;
