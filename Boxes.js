import React from 'react';
import { Card,Typography } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import './Boxes.css';


const Boxes = ({title,cases,total,isRed,active,...props}) => {
    return (
        <Card  onClick = {props.onClick} className = {`infobox ${active && "box_selected"} ${isRed && "infobox__red"}`}>
            <CardContent>
                <Typography>
                    {title}

                </Typography>
                <h2>
                    {cases}
                </h2>
                <Typography>
                    {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Boxes
