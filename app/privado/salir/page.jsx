'use client';
import React from 'react';
import storage from '@/utils/storage';

function SalirPage() {
        // Clear sessionStorage
        //localStorage.clear();
        storage.clearToken();
        storage.clearUser();

        // Redirect to the root URL
        window.location.href = '/';
};

export default SalirPage;