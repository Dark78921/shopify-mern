import React, { memo } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  Image,
  ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

interface Image {
  img: string[];
  idx: number;
}

const Carousel = () => {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={35}
      isPlaying
      interval={3000}
      totalSlides={5}
    >
      <Slider>
        <Slide index={0}>
          <Image
            src="https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            hasMasterSpinner={false}
            isBgImage={false}
            className="home__carousel--img"
          />
        </Slide>
        <Slide index={1}>
          <Image
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            hasMasterSpinner={false}
            isBgImage={false}
            className="home__carousel--img"
          />
        </Slide>
        <Slide index={2}>
          <Image
            src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            hasMasterSpinner={false}
            isBgImage={false}
            className="home__carousel--img"
          />
        </Slide>
        <Slide index={3}>
          <Image
            src="https://images.unsplash.com/photo-1526745925052-dd824d27b9ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            hasMasterSpinner={false}
            isBgImage={false}
            className="home__carousel--img"
          />
        </Slide>
        <Slide index={4}>
          <Image
            src="https://images.unsplash.com/photo-1551201602-3f9456f0fbf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            hasMasterSpinner={false}
            isBgImage={false}
            className="home__carousel--img"
          />
        </Slide>
      </Slider>
      <ButtonBack className="home__carousel--back">
        <IconButton>
          <NavigateBeforeIcon />
        </IconButton>
      </ButtonBack>
      <ButtonNext className="home__carousel--next">
        <IconButton>
          <NavigateNextIcon />
        </IconButton>
      </ButtonNext>
    </CarouselProvider>
  );
};

export default memo(Carousel);
