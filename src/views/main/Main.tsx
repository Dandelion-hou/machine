import React from "react";
// @ts-ignore
import {ReactFullpage} from '@fullpage/react-fullpage';
import { Carousel } from '../component/carousel/Carousel';
import { Charts } from '../component/charts/Charts';
import { Table } from '../component/table/Table';
import { Footer } from '../footer/Footer';
export const Main = () => (
    <div>
        <ReactFullpage
            scrollingSpeed = {1000}
            scrollHorizontally = {true}
            sectionsColor={["#282c34", "#ff5f45", "#0798ec"]}
            render={() => {
                return (
                    <div>
                        <Carousel />
                        <Charts />
                        <Table  />
                    </div>
                );
            }}
        />
        <Footer />
    </div>
);

