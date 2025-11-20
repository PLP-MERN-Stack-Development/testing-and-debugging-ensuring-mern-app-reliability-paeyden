// client/src/tests/setup.js

// Adds custom Jest matchers for asserting on DOM nodes
// Allows things like: expect(element).toBeInTheDocument()
import '@testing-library/jest-dom/extend-expect';

// Optional: add global mocks if needed
// Example: mocking window.matchMedia
if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
  });
}

// Optional: configure global fetch mock
// import 'jest-fetch-mock';
// fetchMock.enableMocks();
