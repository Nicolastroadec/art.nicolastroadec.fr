import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home', () => {
    it('should display "Hello world"', () => {
        render(<Home />);
        const helloWorldElement = screen.getByText('Hello world');
        expect(helloWorldElement).toBeInTheDocument();
    });
});
