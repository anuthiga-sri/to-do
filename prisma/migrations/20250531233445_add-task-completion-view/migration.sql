CREATE OR REPLACE VIEW "todo_completion" AS
SELECT
  "todo_id",
  MIN("changed_at") AS "completed_at"
FROM "todo_histories"
WHERE "new_status" = 'COMPLETED'
GROUP BY "todo_id";