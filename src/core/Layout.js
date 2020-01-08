import React from "react";
import Menu from "./Menu";
import Footer from './Footer'
import "../styles.css";
import ScrollUpButton from "react-scroll-up-button";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children,
    jumbo,
    learnMore
}) => (
    <div className="Site">
        <div className="Site-content">
        <Menu />
            <div className={jumbo} >
            <h2 className='container'>{title}</h2>
            <p className="lead container">{description}<i><a href={learnMore}>Learn more</a></i></p>
            </div>
            <div className="main" className={className}>{children}</div>
            <div>
                <ScrollUpButton
                EasingType="easeOutQuad"
                />
            </div></div>
       <Footer />
    </div>
);

export default Layout;
