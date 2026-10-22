// Выгрузка заявок из data/app.db в exports/applications.csv.
// Запуск: npm run export:csv. База открывается только для чтения.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sqlite3 from "sqlite3";

// Пути строятся от корня проекта, а не от текущей папки терминала
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dbPath = path.join(rootDir, "data", "app.db");
const csvPath = path.join(rootDir, "exports", "applications.csv");

const columns = [
  "id",
  "founder_name",
  "email",
  "project_name",
  "stage",
  "problem",
  "demo_url",
  "created_at",
];

const selectSql = `SELECT ${columns.join(", ")} FROM applications ORDER BY id`;

// BOM нужен, чтобы Excel распознал UTF-8 и правильно показал кириллицу
const bom = "﻿";
// RFC 4180: строки CSV разделяются CRLF; переносы внутри значений сохраняются как есть
const lineBreak = "\r\n";

// Значение берётся в кавычки, если в нём есть запятая, кавычка или перенос строки;
// кавычки внутри удваиваются. NULL выгружается пустой ячейкой.
function toCsvValue(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsvRow(values) {
  return values.map(toCsvValue).join(",");
}

function openReadOnly(filePath) {
  return new Promise((resolve, reject) => {
    // OPEN_READONLY без OPEN_CREATE: отсутствующий файл не будет создан
    const db = new sqlite3.Database(filePath, sqlite3.OPEN_READONLY, (error) =>
      error ? reject(error) : resolve(db),
    );
  });
}

function readAll(db, sql) {
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => (error ? reject(error) : resolve(rows)));
  });
}

function close(db) {
  return new Promise((resolve) => db.close(() => resolve()));
}

function fail(message, error) {
  console.error(message);
  if (error) console.error(`Подробности: ${error.message}`);
  process.exitCode = 1;
}

async function main() {
  const relativeDbPath = path.relative(process.cwd(), dbPath);
  const relativeCsvPath = path.relative(process.cwd(), csvPath);

  if (!existsSync(dbPath)) {
    return fail(
      `База данных не найдена: ${relativeDbPath}\n` +
        "Она создаётся при первой заявке. Запустите npm run dev, отправьте форму и повторите выгрузку.",
    );
  }

  let db;
  try {
    db = await openReadOnly(dbPath);
  } catch (error) {
    return fail(`Не удалось открыть базу данных: ${relativeDbPath}`, error);
  }

  let rows;
  try {
    rows = await readAll(db, selectSql);
  } catch (error) {
    return fail(
      /no such table/i.test(error.message)
        ? `В базе ${relativeDbPath} нет таблицы applications. Отправьте хотя бы одну заявку через форму.`
        : `Не удалось прочитать заявки из ${relativeDbPath}`,
      error,
    );
  } finally {
    await close(db);
  }

  const lines = [toCsvRow(columns), ...rows.map((row) => toCsvRow(columns.map((column) => row[column])))];
  const csv = bom + lines.join(lineBreak) + lineBreak;

  try {
    mkdirSync(path.dirname(csvPath), { recursive: true });
    // Файл каждый раз перезаписывается целиком актуальными данными
    writeFileSync(csvPath, csv, "utf8");
  } catch (error) {
    return fail(
      `Не удалось записать ${relativeCsvPath}. Если файл открыт в Excel или Numbers, закройте его и повторите.`,
      error,
    );
  }

  console.log(`Выгружено заявок: ${rows.length}`);
  console.log(`Файл: ${csvPath}`);
}

await main();
