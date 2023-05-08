export const schema = [

    `CREATE TABLE IF NOT EXISTS Record (
        id              INTEGER PRIMARY KEY,
        creation_date   TEXT NOT NULL,
        title           TEXT NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS Parameter (
        id          INTEGER PRIMARY KEY,
        record_id   INTEGER NOT NULL,
        title       TEXT NOT NULL,
        min         REAL,
        max         REAL,
        unit        TEXT,
        FOREIGN KEY (record_id) REFERENCES Record(id)
    );`,

    `CREATE TABLE IF NOT EXISTS Entry_Data (
        id              INTEGER PRIMARY KEY,
        record_id       INTEGER NOT NULL,
        addition_date   TEXT NOT NULL,
        FOREIGN KEY (record_id) REFERENCES Record(id)
    );`,

    `CREATE TABLE IF NOT EXISTS Entry_Detail (
        id              INTEGER PRIMARY KEY,
        entry_id        INTEGER NOT NULL,
        parameter_id    INTEGER NOT NULL,
        data_value      REAL NOT NULL,
        FOREIGN KEY (entry_id) REFERENCES Entry_Data(id),
        FOREIGN KEY (parameter_id) REFERENCES Parameter(id)
    );`

];