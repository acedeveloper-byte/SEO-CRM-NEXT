import React, { useEffect, useState } from "react";
import Router from "next/router";

const Navdata = () => {
    const [isSeoPages, setIsSeoPages] = useState(false);
    const [isBlog, setIsBlog] = useState(false);
    const [isSites, setIsSites] = useState(false);
    const [isAddSite, setIsAddSite] = useState(false);
    const [isCurrentState, setIsCurrentState] = useState('');
    const [loggedIn, setLoggedIn] = useState<any>({});

    function updateIconSidebar(e: any) {
        if (e?.target?.getAttribute("sub-items")) {
            const ul: any = document.getElementById("two-column-menu");
            const iconItems: any = ul?.querySelectorAll(".nav-icon.active");
            iconItems?.forEach((item: any) => {
                item.classList.remove("active");
                const id: any = item.getAttribute("sub-items");
                const menusId = document.getElementById(id);
                menusId?.parentElement?.classList.remove("show");
            });
            e.target.classList.add("active");
        }
    }

    useEffect(() => {
        document.body.classList.remove("twocolumn-panel");

        const statesToPaths: { [key: string]: string } = {
            Dashboard: "/dashboard",
            Widgets: "/widgets",
            Calendar: "/calendar",
            "API Key": "/api-key",
            Contact: "/contact",
            Leaderboard: "/leaderboard",
        };

        if (statesToPaths[isCurrentState]) {
            Router.push(statesToPaths[isCurrentState]);
            document.body.classList.add("twocolumn-panel");
        }

        if (typeof window !== "undefined" && localStorage.getItem("authUser")) {
            const currUser = JSON.parse(localStorage.getItem("authUser") || "{}");
            setLoggedIn(currUser);
        }
    }, [isCurrentState]);

    const adminMenuItems = [
        { label: "Menu", isHeader: true },
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "bi bi-speedometer2",
            link: "/dashboard",
            click: (e: any) => {
                e.preventDefault();
                setIsCurrentState("Dashboard");
            }
        },
        {
            id: "user",
            label: "User Management",
            icon: "bi bi-people",
            link: "/users/add-users",
            click: (e: any) => {
                e.preventDefault();
                setIsCurrentState("Users");
            }
        },
        {
            id: "seo",
            label: "SEO",
            icon: "bi bi-person-circle",
            link: "/#",
            click: (e: any) => {
                e.preventDefault();
                setIsSeoPages(!isSeoPages);
                setIsCurrentState("SeoPages");
                updateIconSidebar(e);
            },
            stateVariables: isSeoPages,
            subItems: [
                {
                    id: "add-blogs",
                    label: "Add Blogs",
                    link: "/#",
                    isChildItem: true,
                    click: (e: any) => {
                        e.preventDefault();
                        setIsBlog(!isBlog);
                    },
                    parentId: "seo",
                    stateVariables: isBlog,
                    childItems: [
                        { id: 1, label: "Add", link: "/seo/add-blog" },
                    ]
                },
            ],
        },
        {
            id: "Sites",
            label: "Sites Management",
            icon: "bi bi-globe",
            link: "/#",
            click: (e: any) => {
                e.preventDefault();
                setIsSites(!isSites);
                setIsCurrentState("Sites");
                updateIconSidebar(e);
            },
            stateVariables: isSites,
            subItems: [
                {
                    id: "add-site",
                    label: "Add Sites",
                    link: "/sites/all-sites",
                    click: (e: any) => {
                        e.preventDefault();
                        setIsAddSite(!isAddSite);
                    },
                },
            ],
        },
    ];

    const seoExecutiveMenuItems = [
        { label: "Menu", isHeader: true },
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "bi bi-speedometer2",
            link: "/dashboard",
            click: (e: any) => {
                e.preventDefault();
                setIsCurrentState("Dashboard");
            }
        },

        {
            id: "seo",
            label: "SEO",
            icon: "bi bi-person-circle",
            link: "/#",
            click: (e: any) => {
                e.preventDefault();
                setIsSeoPages(!isSeoPages);
                setIsCurrentState("SeoPages");
                updateIconSidebar(e);
            },
            stateVariables: isSeoPages,
            subItems: [
                {
                    id: "add-blogs",
                    label: "Add Blogs",
                    link: "/#",
                    isChildItem: true,
                    click: (e: any) => {
                        e.preventDefault();
                        setIsBlog(!isBlog);
                    },
                    parentId: "seo",
                    stateVariables: isBlog,
                    childItems: [
                        { id: 1, label: "Add", link: "/seo/add-blog" },
                    ]
                },
            ],
        },
    ];

    const menuItems = loggedIn?.role === "ADMIN"
        ? adminMenuItems
        : loggedIn?.role === "SEO_EXECUTIVE"
        ? seoExecutiveMenuItems
        : [];

    return <>{menuItems}</>;
};

export default Navdata;
