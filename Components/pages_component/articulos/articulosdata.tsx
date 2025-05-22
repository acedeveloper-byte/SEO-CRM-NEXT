
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Dropdown } from "react-bootstrap";
import { recentOrders } from "@common/data";
import TableContainer from "@common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
// import { GetAllCategory } from "Components/slices/category/thunk";
// import { imagebaseURL } from "Components/helpers/url_helper";
import moment from "moment";
import { useRouter } from "next/router";
import { MdEditNote } from "react-icons/md";
import { GetAllBlogs } from "Components/slices/blog/thunk";
import { URL_IMAGE } from "Components/helpers/url_helper";
import { GetAllArticulos } from "Components/slices/articulos/thunk";

const Articulosdatatable = () => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const [showSubCategory, setShowSubCategory] = useState<boolean>(false);
  const { categorydata } = useSelector((state: any) => ({
    categorydata: state.Blog.blogdata,
  }));

  const columns = useMemo(
    () => [
        {
            Header: "Blog Image",
            accessor: "blog_images",
            disableFilters: true,
            filterable: true,
            Cell: ({ cell }: any) => {
              const imageUrl = cell.value;
                console.log("imageUrl" , imageUrl)
              if (!imageUrl || imageUrl === "undefined") {
                return <span className="text-muted">No Image</span>;
              }
          
              return (
                <img
                  src={`${URL_IMAGE}${imageUrl}`}
                  alt="Blog"
                  style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "4px" }}
                />
              );
            },
          },
      {
        Header: "Meta Title",
        accessor: "meta_title",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Focus Keywords",
        accessor: "focus_keywords",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Meta Description",
        accessor: "meta_description",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Category",
        accessor: "category",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Blog URL",
        accessor: "blog_url",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Blog Image Tag",
        accessor: "blog_image_tag",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Title Tag H1",
        accessor: "title_tag_h1",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Blog Description",
        accessor: "blog_description",
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Created Date",
        accessor: (cellProps: any) => {
          return (
            <div className="d-flex align-items-center">
              {moment(cellProps.createdAt).format("YYYY-MM-DD HH:mm")}
            </div>
          );
        },
        disableFilters: true,
        filterable: true,
      },
      {
        Header: "Updated Date",
        accessor: (cellProps: any) => {
          return (
            <div className="d-flex align-items-center">
              {moment(cellProps.updatedAt).format("YYYY-MM-DD HH:mm")}
            </div>
          );
        },
        disableFilters: true,
        filterable: true,
      },
    ],
    []
  );
  

  useEffect(() => {
    dispatch(GetAllArticulos());
  }, []);

  return (
    <Col xl={12}>
      <Card>
        <Card.Header className="align-items-center d-flex mb-n2">
          <h4 className="card-title mb-0 flex-grow-1">Blog data</h4>
          <div className="flex-shrink-0">
            <Dropdown className="card-header-dropdown">
              <Dropdown.Toggle
                variant="link-dark"
                className="text-reset dropdown-btn arrow-none p-0"
              >
                {/* as={CustomToggle} */}
                <span className="fw-semibold text-uppercase fs-12">
                  Sort by:
                </span>
                <span className="text-muted">
                  Today<i className="mdi mdi-chevron-down ms-1"></i>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item href="#">Today</Dropdown.Item>
                <Dropdown.Item href="#">Yesterday</Dropdown.Item>
                <Dropdown.Item href="#">Last 7 Days</Dropdown.Item>
                <Dropdown.Item href="#">Last 30 Days</Dropdown.Item>
                <Dropdown.Item href="#">This Month</Dropdown.Item>
                <Dropdown.Item href="#">Last Month</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>

        {/* <Card.Body> */}
        <TableContainer
          columns={columns || []}
          data={categorydata || []}
          isGlobalFilter={false}
          iscustomPageSize={false}
          isBordered={false}
          customPageSize={6}
          tableClass="table-centered align-middle table-nowrap mb-0"
          theadClass="table-light"
        />
        {/* </Card.Body> */}
      </Card>
   
    </Col>
  );
};

export default Articulosdatatable;