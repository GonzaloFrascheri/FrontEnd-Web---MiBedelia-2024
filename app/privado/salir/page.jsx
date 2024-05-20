'use client';
import React from 'react';

function SalirPage() {
        // Clear sessionStorage
        localStorage.clear();

        // Redirect to the root URL
        window.location.href = '/';

};

export default SalirPage;