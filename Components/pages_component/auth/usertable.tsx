
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
import { GetAllUser } from "Components/slices/user/thunk";

const Usertable = () => {
    const dispatch: any = useDispatch();
    const router = useRouter();
    const [showSubCategory, setShowSubCategory] = useState<boolean>(false);
    const { inSideUserdata } = useSelector((state: any) => ({
        inSideUserdata: state.inUser.inSideUserdata


    }));




    const columns = useMemo(
        () => [
            {
                Header: "First Name",
                accessor: "firstName",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Last Name",
                accessor: "lastName",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Username",
                accessor: "user_name",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Email",
                accessor: "email",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Mobile Number",
                accessor: "number",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Site",
                accessor: "site",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Role",
                accessor: "role",
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Created Date",
                accessor: (row: any) => (
                    <div className="d-flex align-items-center">
                        {moment(row.createdAt).format("YYYY-MM-DD HH:mm")}
                    </div>
                ),
                disableFilters: true,
                filterable: true,
            },
            {
                Header: "Updated Date",
                accessor: (row: any) => (
                    <div className="d-flex align-items-center">
                        {moment(row.updatedAt).format("YYYY-MM-DD HH:mm")}
                    </div>
                ),
                disableFilters: true,
                filterable: true,
            },
        ],
        []
    );
    useEffect(() => {
        dispatch(GetAllUser());
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
                    data={inSideUserdata || []}
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

export default Usertable;