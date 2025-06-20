'use client';

import dynamic from 'next/dynamic';
import { Point } from './CustomMap';

const CustomMap = dynamic(() => import('./CustomMap'), {
    ssr: false,
});

export default function CustomMapWrapper(props: { points: Point[] }) {
    return <CustomMap {...props} />;
}
