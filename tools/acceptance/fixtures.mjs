// Browser-side fixture data and extraction. Expectations are checked by host code.
export const bitBytes = [0x00, 0x01, 0x03, 0x07, 0x0f];
export const floatVectors = [[1, 0], [0, 1], [-1, 0]];

export function writeFixtures(db) {
  db.exec('BEGIN; CREATE TABLE ordinary(id INTEGER PRIMARY KEY, value TEXT);');
  db.exec("INSERT INTO ordinary VALUES(1,'committed ordinary data'),(2,'survives Worker termination');");
  db.exec('CREATE VIRTUAL TABLE floats USING vec0(embedding float[2]); CREATE VIRTUAL TABLE bits USING vec0(embedding bit[8]);');
  floatVectors.forEach((v, i) => db.exec({ sql: 'INSERT INTO floats(rowid,embedding) VALUES(?,?)', bind: [i + 1, JSON.stringify(v)] }));
  bitBytes.forEach((v, i) => db.exec({ sql: 'INSERT INTO bits(rowid,embedding) VALUES(?,vec_bit(?))', bind: [i + 1, new Uint8Array([v])] }));
  db.exec('COMMIT');
}

// Reopen calls only this function: no DDL, INSERT, recovery or fixture repair.
export function readFixtures(db) {
  return {
    ordinary: db.selectArrays('SELECT id,value FROM ordinary ORDER BY id'),
    floats: db.selectArrays("SELECT rowid,distance FROM floats WHERE embedding MATCH '[1,0]' AND k=3 ORDER BY distance"),
    bits: db.selectArrays('SELECT rowid,distance FROM bits WHERE embedding MATCH vec_bit(?) AND k=5 ORDER BY distance', [new Uint8Array([0])]),
  };
}

export function sqlProbe(sqlite3) {
  const db = new sqlite3.oo1.DB(':memory:', 'c');
  try {
    writeFixtures(db);
    db.exec("CREATE VIRTUAL TABLE texts USING fts5(body); INSERT INTO texts(rowid,body) VALUES(1,'browser vector'),(2,'other'),(3,'browser persistence');");
    return { ...readFixtures(db), fts: db.selectArrays("SELECT rowid FROM texts WHERE texts MATCH 'browser' ORDER BY rowid").flat() };
  } finally { db.close(); }
}
