import React, { Component, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Banner1 from '../images/banner1.jpg';
import Banner2 from '../images/banner2.jpg';
import Banner3 from '../images/banner3.jpg';


export function Home() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Banner1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>How to list yourself</h3>
                    <p>List yourself with us</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Banner2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>How to list your hospital</h3>
                    <p>List your hospital with us</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Banner3}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Health care Professional</h3>
                    <p>
                       Be a part of our family
          </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
