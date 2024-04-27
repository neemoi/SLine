import React from 'react';
import image from '../../../img/img0.jpg'

function ExampleComponent() {
    return (
        <>
            <div className="container mt-5">
                <hr className="container mt-5" />
                <div className="row mt-5">
                    <div className="col-md-6 mb-4">
                        <img src={image} alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-6 mb-4 mt-5" style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                        <p>Proin sit amet sapien ut mauris fermentum consequat ut vel nisi. In sit amet ipsum eu sapien
                            posuere
                            imperdiet. Integer nec lacinia ex. Vivamus commodo, libero in fringilla ultricies, tortor enim
                            dignissim sapien, non eleifend odio turpis id nulla.</p>
                    </div>
                </div>
                <hr className="container mt-5" />
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 mb-4 mt-5" style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                        <p>Proin sit amet sapien ut mauris fermentum consequat ut vel nisi. In sit amet ipsum eu sapien
                            posuere
                            imperdiet. Integer nec lacinia ex. Vivamus commodo, libero in fringilla ultricies, tortor enim
                            dignissim sapien, non eleifend odio turpis id nulla.</p>
                    </div>
                    <div className="col-md-6 mb-4 mt-5">
                        <img src={image} alt="" className="img-fluid" />
                    </div>
                </div>
                <div className="container mt-5"></div>
            </div>
        </>
    );
}

export default ExampleComponent;
