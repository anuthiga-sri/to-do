const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTodoListOfAUser = async (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });
  
    try {
      const todos = await prisma.todo.findMany({
        where: { userId: Number(userId) }
      });
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
};
