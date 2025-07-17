import React, { createContext, useState, useEffect } from 'react';
// 创建 Context
export const UserContext = createContext();

// 创建 Provider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // 页面刷新后，从 localStorage 恢复用户状态
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // 登录函数
    const login = (userData) => {

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // 保存到 localStorage
        console.log(localStorage.getItem('user'))
    };

    // 登出函数
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
