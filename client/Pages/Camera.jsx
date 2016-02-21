import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        MeteorCamera.getPicture((error, data) => {
           if(error) {
               console.log("CAMERA ERROR!");
           } else {
               console.log(data);
           }
        });
    }
    render() {
        return (
            <div>
                CAMERA
            </div>
        )
    }
}