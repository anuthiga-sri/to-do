const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTodoListOfAUser = async (req, res) => {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });
  
    try {
      const todos = await prisma.todo.findMany({
        where: { userId: Number(userId) }
      });
      res.status(200).json({ message: 'Successfully retrieved todo list.', todoList: todos });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

exports.addTodo = async (req, res) => {
  const {title, description, dueDate, userId} = req.body
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        userId
      },
    });

    res.status(201).json({ message: 'Todo added successfully.', todo });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error.' });
  }
}
