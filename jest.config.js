module.exports = {
  // roots: ['<rootDir>/src'],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy"
  },
};
