// Replace the require statement with an import statement
import { expect } from 'chai';

// ... existing code ...
describe('Array', function() {
  it('should start empty', function() {
    const arr = [];

    expect(arr).to.be.an('array').that.is.empty;
  });
});
// ... existing code ...