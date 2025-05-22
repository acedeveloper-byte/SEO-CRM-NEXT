import React, { ReactElement } from "react";
import Head from "next/head";
// import ReactForm from "../../Components/pages_componets/category/form";
// import Categorytable from "./../../Components/pages_componets/category/categorytable";
import Layout from "@common/Layout";
import ReactForm from "Components/pages_component/blog/form";
import BlogdataTable from "Components/pages_component/blog/blogtable";

const Index_Category = () => {
    return (
        <React.Fragment>
            <Head>
                <title>Index_Category | Ace Digital Solutions </title>
            </Head>
            <div className="page-content">
                <ReactForm />
                <BlogdataTable />

            </div>
        </React.Fragment>
    );
};

Index_Category.getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>;
};
export default Index_Category;