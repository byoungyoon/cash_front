import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import React from 'react';

export default function Info(){
    return(
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardBody>
                            123
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}