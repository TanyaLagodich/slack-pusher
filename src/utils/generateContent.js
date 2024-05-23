export const generateContent = (assignees, objectAttributes) => {
  return [
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `*Title:* ${objectAttributes.title}`
        },
        {
          type: 'mrkdwn',
          text: `*Description:* ${objectAttributes.description}`
        },
        {
          type: 'mrkdwn',
          // Special for Shahriyar
          text: `*${assignees.id === 41 ? 'Person to blame' : 'Author'}:* ${assignees.name}`
        },
        {
          type: 'mrkdwn',
          text: `*Created At:* ${objectAttributes.created_at}`
        },
        {
          type: 'mrkdwn',
          text: `*URL:* ${objectAttributes.url}`
        },
      ]
    }
  ];
}


// objectAttributes.title
// objectAttributes.description
// objectAttributes.author_id
// objectAttributes.created_at
// objectAttributes.url
