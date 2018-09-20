const assert = require("assert");
const { getRandomIntInclusive } = require("../src/utils");

describe("Utils", function() {
  describe("#getRandomIntInclusive(min, max)", function() {
    it("should return 1 number:  0 or 1", function() {
      const number = getRandomIntInclusive(0, 1);
      if (number > -1 && number < 2) {
        assert.ok(true);
      } else {
        assert.fail("The number is not 0 or 1");
      }
    });
  });
});
