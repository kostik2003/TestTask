import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import {publicRoutes } from '../routes';
const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} exact/>
            )}
        </Routes>
    );
};

export default AppRouter;