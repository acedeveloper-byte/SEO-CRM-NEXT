import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import ReactForm from "Components/pages_component/auth/form";
import Usertable from "Components/pages_component/auth/usertable";

const User = () => {
    return (
        <React.Fragment>
            <Head>
                <title>User | Ace Digital Solutions </title>
            </Head>
            <div className="page-content">
                <ReactForm />
                <Usertable /> 
            </div>
        </React.Fragment>
    );
};

User.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};
export default User;