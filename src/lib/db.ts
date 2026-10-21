// Серверный модуль: импорт в клиентский компонент сломает сборку
import "server-only";
import { mkdirSync } from "node:fs";
import path from "node:path";
import sqlite3 from "sqlite3";
import type { Application } from "@/lib/applicationSchema";

const dbPath = path.join(process.cwd(), "data", "app.db");

// Таблица создаётся при первом обращении; формальных миграций нет
const createTableSql = `
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    founder_name TEXT NOT NULL,
    email TEXT NOT NULL,
    project_name TEXT NOT NULL,
    stage TEXT NOT NULL,
    problem TEXT NOT NULL,
    demo_url TEXT,
    created_at TEXT NOT NULL
  )
`;

const insertSql = `
  INSERT INTO applications (founder_name, email, project_name, stage, problem, demo_url, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

let connection: Promise<sqlite3.Database> | undefined;

function openDatabase(): Promise<sqlite3.Database> {
  mkdirSync(path.dirname(dbPath), { recursive: true });

  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (openError) => {
      if (openError) return reject(openError);
      db.run(createTableSql, (createError) => (createError ? reject(createError) : resolve(db)));
    });
  });
}

// Одно подключение на процесс; если открыть базу не удалось, следующий запрос попробует снова
function getDatabase(): Promise<sqlite3.Database> {
  connection ??= openDatabase().catch((error: unknown) => {
    connection = undefined;
    throw error;
  });
  return connection;
}

// Сохраняет проверенную заявку и возвращает id новой записи только после завершения записи
export async function saveApplication(application: Application): Promise<number> {
  const db = await getDatabase();
  const params = [
    application.founderName,
    application.email,
    application.projectName,
    application.stage,
    application.problem,
    application.demoUrl || null,
    new Date().toISOString(),
  ];

  return new Promise((resolve, reject) => {
    db.run(insertSql, params, function (error) {
      if (error) return reject(error);
      resolve(this.lastID);
    });
  });
}
