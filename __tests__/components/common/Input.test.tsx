import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '@/components/common/Input';

describe('Input component', () => {
  it('renders input correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    render(<Input label="Email Address" id="email" />);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(<Input error="Invalid email address" />);
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('renders helper text when provided', () => {
    render(<Input helperText="We will never share your email" />);
    expect(screen.getByText('We will never share your email')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Type here" />);
    
    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
