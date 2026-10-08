import assert from 'node:assert/strict';

// Independent host arithmetic; never obtain expected values from SQL/sqlite-vec.
export const expectedOrdinary = [[1, 'committed ordinary data'], [2, 'survives Worker termination']];
export const expectedFloats = [[1, 0], [2, Math.sqrt((0 - 1) ** 2 + (1 - 0) ** 2)], [3, 2]];
const popcount = byte => { let count = 0; for (; byte; byte >>>= 1) count += byte & 1; return count; };
export const expectedBits = [0, 1, 3, 7, 15].map((byte, i) => [i + 1, popcount(byte ^ 0)]);
export const floatTolerance = 1e-5;

export function checkRows(actual, expected, tolerance = 0) {
  assert.equal(actual.length, expected.length, 'Neighbor count');
  expected.forEach(([id, distance], i) => {
    assert.equal(actual[i][0], id, 'Neighbor identifier/order');
    assert.ok(Number.isFinite(actual[i][1]) && Math.abs(actual[i][1] - distance) <= tolerance, 'Neighbor distance');
  });
}

export function checkFixtures(result) {
  assert.deepEqual(result.ordinary, expectedOrdinary, 'Committed ordinary rows');
  checkRows(result.floats, expectedFloats, floatTolerance);
  checkRows(result.bits, expectedBits);
}
