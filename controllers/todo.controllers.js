const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTodoListOfAUser = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  let todos;

  try {
    if (Number(userId) === 0) {
      todos = await prisma.todo.findMany({
        include: {
          todoHistories: true,
          user: true
        }
      });
    } else {
      todos = await prisma.todo.findMany({
        where: { userId: Number(userId) }
      });
    }

    res.status(200).json({ message: 'Successfully retrieved todo list.', todoList: todos });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

exports.addTodo = async (req, res) => {
  const { title, description, dueDate, userId } = req.body
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
    res.status(500).json({ error: 'Internal server error.' });
  }
}

exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { userId } = req.body;
  let oldStatus;

  try {
    const allowedKeysForStatusUpdate = ['status', 'userId'];
    const bodyKeys = Object.keys(req.body);

    const isOnlyStatusChange = bodyKeys.every(key => allowedKeysForStatusUpdate.includes(key)) && bodyKeys.length === allowedKeysForStatusUpdate.length;

    // if only status change, need old status and add to todo history.
    if (isOnlyStatusChange) {
      const selectedTodo = await prisma.todo.findFirst({
        where: { id: Number(todoId), userId: Number(userId) }
      });
      oldStatus = selectedTodo?.status;
    }

    delete req.body.userId;
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(todoId), userId: Number(userId) },
      data: { ...req.body }
    });

    if (isOnlyStatusChange && oldStatus) {
      await prisma.todoHistory.create({
        data: {
          todoId: Number(todoId),
          oldStatus,
          newStatus: req.body.status
        }
      })
    }
    res.status(200).json({ message: 'Todo updated successfully.', todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
}

exports.getTodoHistory = async (req, res) => {
  const { todoId } = req.params;
  if (!todoId) return res.status(400).json({ error: 'Missing todoId' });

  try {
    const todoHistories = await prisma.todoHistory.findMany({
      where: { todoId: Number(todoId) },
      orderBy: {changedAt: 'desc'}
    });
    
    res.status(200).json({ message: 'Successfully retrieved todo history.', todoHistories });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todo history' });
  }
}
