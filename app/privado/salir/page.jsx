'use client';
import React from 'react';

function SalirPage() {
        // Clear sessionStorage
        sessionStorage.clear();

        // Redirect to the root URL
        window.location.href = '/';

};

export default SalirPage;