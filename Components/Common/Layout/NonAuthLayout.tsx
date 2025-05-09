import { useProfile } from '@common/UserHooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { ReactNode } from 'react'

interface NonAuthLayoutProps  {
    children: ReactNode
  }
 
const NonAuthLayout = ({children} : NonAuthLayoutProps) => {
    const { userProfile, loading } = useProfile();
    const router = useRouter();

    // const redirectLoginFunction = () => {
    //     if (typeof window !== 'undefined') { // Check if we're on the client-side
    //       if (!userProfile) {
    //         router.push('/auth/login');
    //       }
    //     }
    //   };

    //   useEffect(() => {
    //     redirectLoginFunction();
    //   },[])
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}

export default NonAuthLayout;