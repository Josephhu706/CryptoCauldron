import { render, screen, cleanup, waitForElement, getByTestId, fireEvent, } from '@testing-library/react'
import Trending from '../pages/Trending'
import '@testing-library/jest-dom'
import axiosMock from 'axios'
import renderer from 'react-test-renderer'
import 'jest-canvas-mock';


// //makes sure each test is starting from the same starting point
afterEach(()=>{
    cleanup()
})

jest.mock('axios');

test("trending should be rendered", () => {
    render(<Trending />);
    const trendingPage = screen.getByTestId("trendingPage");
    expect(trendingPage).toBeInTheDocument()
});


test("cauldron should be rendered", () => {
    render(<Trending />);
    const animation = screen.getByTestId("animation");
    expect(animation).toBeInTheDocument()
});