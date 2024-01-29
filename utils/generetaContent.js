function generateContent(tasks) {
    const taskElements = tasks.map((task) => {
        return {
            type: 'rich_text_section',
            elements: [
                {
                    type: "link",
                    url: task.permalink_url,
                    text: task.name,
                    style: {
                        "bold": true
                    },
                },
                {
                    type: "text",
                    text: task.notes,
                },
                {
                    type: "text",
                    text: "\n "
                }
            ]
        }
    });

    return [
        {
            "type": "header",
            "text": {
                "type": "plain_text",
                "text": " <!here> Задачи на code review с прошлой недели:",
            }
        },
        {
            "type": "rich_text",
            "elements": [
                {
                    "type": "rich_text_list",
                    "style": "bullet",
                    "elements": taskElements,
                },
            ],
        },
    ]
}

module.exports = generateContent;
