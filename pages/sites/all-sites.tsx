import React, { ReactElement } from "react";
import Head from "next/head";
// import ReactForm from "../../Components/pages_componets/category/form";
// import Categorytable from "./../../Components/pages_componets/category/categorytable";
import Layout from "@common/Layout";
import BlogdataTable from "Components/pages_component/blog/blogtable";
import ReactForm from "Components/pages_component/sites/form";

const AllSites = () => {
    return (
        <React.Fragment>
            <Head>
                <title>AllSites | Ace Digital Solutions </title>
            </Head>
            <div className="page-content">
                <ReactForm />
          
            </div>
        </React.Fragment>
    );
};

AllSites.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};
export default AllSites;