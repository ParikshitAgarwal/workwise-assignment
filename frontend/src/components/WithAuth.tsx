"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Cookies from 'js-cookie'

export const withAuth = (WrappedComponent: any) => {
    return function WithAuth(props: any) {
            const isUserAuthenticated = Cookies.get('token');
         
            console.log("isUserAuthenticated:",isUserAuthenticated);
            useEffect(() => {
                if (!isUserAuthenticated) {
                    redirect("/sign-in");
                }

                // if(isUserAuthenticated && )
            }, []);

            if (!isUserAuthenticated) {
                return null;
            }

        return <WrappedComponent {...props} />;
    };
};