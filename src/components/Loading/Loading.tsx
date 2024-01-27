import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingComponent: React.FC = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999
        }}>
            <CircularProgress style={{ color: '#ff6600' }}/>
        </div>
    );
};

export default LoadingComponent;
