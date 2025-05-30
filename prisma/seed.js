import { PrismaClient, TodoStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const todoItems = [
    "Read Chapter 3 of Physics textbook",
    "Complete Math homework set #4",
    "Attend CS101 lecture",
    "Submit Psychology essay draft",
    "Review class notes from Biology",
    "Watch recorded lecture on Data Structures",
    "Finish Chemistry lab report",
    "Practice solving integration problems",
    "Read assigned article for Sociology",
    "Work on History reading reflection",
    "Submit attendance quiz for Philosophy",
    "Attend lab session for Environmental Science",
    "Email professor about grading clarification",
    "Meet with TA for Statistics help",
    "Prepare for group discussion in Literature class",
    "Take online quiz for Microeconomics",
    "Review feedback on last assignment",
    "Update bibliography for Research paper",
    "Attend workshop on academic writing",
    "Create flashcards for key terms in Geography",
    "Outline essay for Political Science",
    "Print notes for tomorrow’s lectures",
    "Backup all coursework to cloud",
    "Organize Google Drive course folders",
    "Set up reminders for weekly readings",
    "Add due dates to calendar",
    "Review previous lecture slides",
    "Work on Music Theory listening journal",
    "Prepare speech for Communications class",
    "Take notes while re-watching difficult lectures",
    "Finalize project topic for Software Engineering",
    "Meet with group for capstone brainstorming",
    "Submit project proposal",
    "Draft wireframes for app design",
    "Create timeline for project milestones",
    "Research related work for Literature Review",
    "Prepare slides for project presentation",
    "Record screencast demo of prototype",
    "Collect data for research project",
    "Analyze survey responses using Excel",
    "Review coding standards with teammates",
    "Push code to GitHub repo",
    "Attend weekly project check-in",
    "Write project status update",
    "Refactor code for maintainability",
    "Test app features for bugs",
    "Finish UI component for main dashboard",
    "Set up Trello board for task tracking",
    "Practice project presentation with team",
    "Submit interim project report",
    "Read IEEE paper on project topic",
    "Conduct usability testing with peers",
    "Prepare documentation for project",
    "Update GitHub README",
    "Schedule final project demo",
    "Create study schedule for finals",
    "Review last semester’s exam papers",
    "Make summary notes for key topics",
    "Watch YouTube videos on complex topics",
    "Practice multiple-choice questions",
    "Attend study group session",
    "Ask professor for clarification on exam format",
    "Solve past year exam questions",
    "Time yourself doing mock test",
    "Memorize key formulas",
    "Review flashcards daily",
    "Quiz yourself on definitions",
    "Teach concept to a friend",
    "Highlight important points in textbook",
    "Prioritize weak subjects",
    "Review lecture slides for exam hints",
    "Create a mind map of key ideas",
    "List potential essay questions",
    "Practice writing timed essays",
    "Review lab practical material",
    "Organize notes by subject",
    "Download all exam resources",
    "Install a pomodoro timer app",
    "Clean and organize study space",
    "Create a digital folder structure for files",
    "Plan meals for the week",
    "Listen to productivity podcast",
    "Learn keyboard shortcuts for better workflow",
    "Create a playlist for deep focus"
];

async function main() {
    for (let i = 0; i < 10; i++) {
        const name = faker.person.fullName(), email = faker.internet.email();
        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });

        console.log("===========================");
        console.log({ name, email });

        for (let j = 0; j < 10; j++) {
            const dueDate = faker.date.past({ years: 1 });
            const oneMonthEarlierDueDate = new Date(dueDate);
            oneMonthEarlierDueDate.setMonth(dueDate.getMonth() - 1);
            const createdAt = faker.date.between({ from: oneMonthEarlierDueDate, to: dueDate });
            const status = faker.helpers.arrayElement([TodoStatus.TODO, TodoStatus.IN_PROGRESS, TodoStatus.COMPLETED]);
            const title = faker.helpers.arrayElement(todoItems);

            const todo = await prisma.todo.create({
                data: {
                    title,
                    description: faker.lorem.paragraph(),
                    status,
                    dueDate,
                    createdAt,
                    userId: user.id,
                },
            });

            console.log({ title, status, dueDate, createdAt })

            switch (status) {
                case 'TODO':
                    break;
                case 'IN_PROGRESS':
                    await prisma.todoHistory.create({
                        data: {
                            oldStatus: TodoStatus.TODO,
                            newStatus: status,
                            changedAt: faker.date.between({ from: todo.createdAt, to: new Date() }),
                            todoId: todo.id,
                        },
                    });
                    console.log("todo history in progress only")
                    break;
                case 'COMPLETED':
                    const changedAt1 = faker.date.between({
                        from: todo.createdAt,
                        to: new Date(),
                    });

                    await prisma.todoHistory.create({
                        data: {
                            oldStatus: TodoStatus.TODO,
                            newStatus: TodoStatus.IN_PROGRESS,
                            changedAt: changedAt1,
                            todoId: todo.id,
                        },
                    });

                    console.log("todo history - in progress")

                    const minGap = 1000;
                    const fromTime = new Date(changedAt1.getTime() + minGap);
                    const toTime = new Date();

                    const changedAt2 =
                        fromTime < toTime
                            ? faker.date.between({ from: fromTime, to: toTime })
                            : new Date(fromTime);

                    await prisma.todoHistory.create({
                        data: {
                            oldStatus: TodoStatus.IN_PROGRESS,
                            newStatus: TodoStatus.COMPLETED,
                            changedAt: changedAt2,
                            todoId: todo.id,
                        },
                    });

                    console.log("todo history - completed")
                    break;
            }
        }
    }
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e)
        prisma.$disconnect()
        process.exit(1)
    })
