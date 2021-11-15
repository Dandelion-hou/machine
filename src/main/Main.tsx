/*******************************************************************************
 * Copyright (c) 2019, 2021 Obeo.
 * This program and the accompanying materials
 * are made available under the erms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *     Obeo - initial API and implementation
 *******************************************************************************/
// @ts-ignore
import ReactFullpage from '@fullpage/react-fullpage';
import { Carousel } from '../views/component/carousel/Carousel';
import { Charts } from '../views/component/charts/Charts';
import { Table } from '../views/component/table/Table';
import { Footer } from '../views/footer/Footer';
export const Main =() =>(
    <>
        <ReactFullpage
            scrollingSpeed = {1000}
            scrollHorizontally = {true}
            sectionsColor={["#282c34", "#ff5f45", "#0798ec"]}
            render={() => {
                return (
                    <>
                        <Carousel />
                        <Charts />
                        <Table  />
                    </>
                );
            }}
        />
        <Footer />
    </>
);

