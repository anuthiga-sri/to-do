const { PrismaClient, TodoStatus } = require('@prisma/client');
const prisma = new PrismaClient();

const { normalizeData } = require('../utils/index');

exports.getStatistic = async (req, res) => {
  try {
    const result = await prisma.$queryRawUnsafe(`
        SELECT
            u.id AS "user_id",
            u.name AS "user_name",
            COUNT(t.id) AS "totalTodoCount",

            COUNT(*) FILTER (WHERE t.status = 'TODO') AS "todoCount",
            COUNT(*) FILTER (WHERE t.status = 'TODO' AND t.due_date < NOW()) AS "overdueTodoCount",
      
            COUNT(*) FILTER (WHERE t.status = 'IN_PROGRESS') AS "inProgressCount",
            COUNT(*) FILTER (WHERE t.status = 'IN_PROGRESS' AND t.due_date < NOW()) AS "overdueInProgressCount",
      
            COUNT(*) FILTER (WHERE t.status = 'COMPLETED') AS "completedCount"
      
        FROM users u
        LEFT JOIN todos t ON t.user_id = u.id
        GROUP BY u.id
        ORDER BY u.id;
  `);

    res.status(200).json({ message: 'Successfully retrieved todo list.', result: normalizeData(result) });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to fetch' });
  }
};

exports.getOverdue = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        status: {
          not: TodoStatus.COMPLETED
        },
        dueDate: {
          lt: new Date()
        }
      },
      include: {
        todoHistories: true,
        user: true
      },
      orderBy: {createdAt: 'asc'}
    });

    res.status(200).json({ message: 'Successfully retrieved todo list.', todoList: todos });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to fetch' });
  }
};