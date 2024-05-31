'use client';
import React from 'react';
import storage from '@/utils/storage';

function SalirPage() {
        storage.clearToken();
        storage.clearUser();
        window.location.href = '/';
};

export default SalirPage;