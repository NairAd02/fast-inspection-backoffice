'use client';

import dynamic from 'next/dynamic';

const CustomMap = dynamic(() => import('./CustomMap'), {
    ssr: false,
});

export default function CustomMapWrapper(props: { points: any[] }) {
    return <CustomMap {...props} />;
}
