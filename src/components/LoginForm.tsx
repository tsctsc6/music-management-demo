import React, { useState } from 'react';
import { identityService } from '../services/identityServices';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await identityService.login(formData);
            if (response.code !== 200) {
                setError(response.errors?.join() || '登录失败');
                return;
            }
            localStorage.setItem("jwt", response.data?.token || "");
            // 跳转到首页或其他页面
            navigate("/");
        } catch {
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
