-- Up
CREATE TABLE IF NOT EXISTS reservation
  (
     id       INTEGER PRIMARY KEY,
     datetime DATETIME NOT NULL,
     party    TINYINT NOT NULL,
     name     TEXT NOT NULL,
     email    TEXT NOT NULL,
     phone    TEXT,
     message  TEXT
  );

-- Down
