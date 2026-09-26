export const dynamic = 'force-dynamic';
import Banner from '@/components/banner/Banner';
import Plans from '@/components/banner/Plans';

import React from 'react';

const page = () => {
  return (
    <div>
        <Banner />
        <Plans />
       
    </div>
  );
};

export default page;